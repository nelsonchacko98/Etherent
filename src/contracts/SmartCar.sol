pragma solidity ^0.5.10;
 
import "./safeMath.sol";

contract SmartCar {
  //The address of the car, which will sign transactions made by this contract.
  address payable public carSigner;

  // Value of the car, in wei
  //uint public carValue;

  //bytes32 public licensePlate;
  
  uint  balanceToClient;

  // Owners of the car, they will be the ones that receive payments from the car.
  // We assume each owner owns the car equally.
  address[] public owners;
  uint constant MAX_OWNERS = 100;

  //Earning from driving will be distributed to each owner for them to withdraw
  mapping (address => uint) public ownersBalance;
  uint  balanceToDistribute;

  uint constant INITIAL_CAR_SHARES = 100;
  mapping (address => uint) public carShares;

  //DriverEntity currentDriverEntity;
  string public currentDriveStatus;


  address payable currentDriverAddress;
  uint currentDriveStartTime = 0;
  uint256 currentDriveRequiredEndTime =1572674500;
  uint256   fineForDelay=0;
  uint256 timeDiff=0;
  uint256 clientMoney;

  //Rates
  uint constant RATE_DAILYRENTAL = 2 ether; //1 ETH

  // enum DriverEntity {
  //   None,
  //   Owner,
  //   Uber,
  //   DailyRental,
  //   Other
  // }

  // enum DriveStatus {
  //   Idle,
  //   Driving
  // }

  bool carIsReady = false;

 
  struct CarInternals {
    uint fuel; //Measured in percentage
  }

  CarInternals carInternals;


  modifier onlyIfReady {
        require(carIsReady);
        _;
    }

  event E_TransferEthForStipends(address _carSigner,uint _amount, uint indexed _eventDate);
  event E_RentCarDaily(address indexed _currentDriverAddress,uint _rentValue,uint _rentalStart,uint _rentalEnd);
  event E_EndRentCarDaily(address indexed _currentDriverAddress,uint _rentalEnd, bool _endedWithinPeriod);
  event E_ClientBalance(address indexed _currentDriverAddress,uint256 balanceToClient);
  event owner(address owner,string status);
  

  ////////////////////////////////////
  // Functions
  ////////////////////////////////////

  constructor() public {
   // require(_licensePlate.length >0 && _carValue > 0);
    carSigner = msg.sender;
    //carValue = _carValue;
    //licensePlate = _licensePlate;
    carShares[address(this)] = INITIAL_CAR_SHARES;

    currentDriveStatus ='idle';
    //currentDriverEntity = DriverEntity.None;

    carInternals.fuel = 100;
  }

  
  function setOwners(address  _owners) public {
   // require(msg.sender == carSigner);
   // require(_owners.length > 0 && _owners.length <= MAX_OWNERS);

    //Can only set owners once.
//    require(owners.length == 0);

    owners.push(_owners);

    //We take the total carShares the "car" owns and we distribute them equally among new owners
    //If the shares are not properly divisible (I.E: 100 shares / 3 owners) the remaining shares stay with the car
    // uint sharesToDistribute = carShares[address(this)]/owners.length;

    // for (uint8 i; i<owners.length;i++){
    //   carShares[owners[i]] = sharesToDistribute;
    //   carShares[address(this)] -= sharesToDistribute;
    // }

    carIsReady = true;
    emit owner(_owners,currentDriveStatus);
    
  }

  function isCorrect(string memory _status) public view returns(bool){
        return (keccak256(abi.encodePacked((currentDriveStatus)))==keccak256(abi.encodePacked((_status))));
    }

  /////////////////////////////////////
  // Functions called by a third party
  /////////////////////////////////////


  function rentCarDaily() public onlyIfReady payable{
    //No one must be using the car
     
     require (msg.value == RATE_DAILYRENTAL);
     require(isCorrect('idle')==true);

      currentDriverAddress = msg.sender;
      currentDriveStatus='Driving';
     //currentDriveStatus = DriveStatus.Driving;
    //currentDriverEntity = DriverEntity.DailyRental;
      currentDriveStartTime = now;
      currentDriveRequiredEndTime = now + 6;

      clientMoney= msg.value; // ADD SafeMath Library
   
    emit E_RentCarDaily(currentDriverAddress,msg.value, currentDriveStartTime,currentDriveRequiredEndTime);
  }



  function activateCar(address _user) public view onlyIfReady returns(bool){
    require (_user == currentDriverAddress);
    return true;
  }

  
  function endRentCarDaily () public onlyIfReady payable{
    // The person renting the car can end the rental anytime.
    // The carSigner can end the rental only after the renting period has ended
    // in order to "claim the car back".
    require ((msg.sender == carSigner && now > currentDriveRequiredEndTime)
            || msg.sender == currentDriverAddress);

    //To be called only if it is being rented for the day.
     require(isCorrect('driving')==true);
    //require (currentDriveStatus == DriveStatus.Driving);
    //require (currentDriverEntity == DriverEntity.DailyRental);

    bool endedWithinPeriod = now <= currentDriveRequiredEndTime;
    if(!endedWithinPeriod){
        timeDiff=now-currentDriveRequiredEndTime;
        
        fineForDelay=fineCalculate(timeDiff);
        
    }
    /////////////////////////////////
    //balances to client and owners//
    ////////////////////////////////
    balanceToDistribute=clientMoney-(1 ether+fineForDelay);
    balanceToClient=clientMoney-balanceToDistribute;
    
    emit E_EndRentCarDaily(currentDriverAddress, now, endedWithinPeriod);
    
    distributeBalanceToClient();

    //currentDriverAddress = address(0);
    currentDriveStatus ='idle';
    //currentDriverEntity = DriverEntity.None;
    currentDriveStartTime = 0;
    currentDriveRequiredEndTime = 0;

    //Distribute earnings of the car rental
    distributeEarnings();
   
  }
  function fineCalculate(uint256 _timeDiff) internal pure returns(uint256){
     
     uint256 fine=1*(10**14);
     return _timeDiff*fine;
    
  }
  
  function distributeBalanceToClient()  internal   {
               currentDriverAddress.transfer(balanceToClient);
               emit E_ClientBalance(currentDriverAddress,balanceToClient);
               currentDriverAddress=address(0);
               balanceToClient=0;
  }

  /////////////////////////////////////
  // Functions called by the car itself
  /////////////////////////////////////

 
  
  
  function triggerTransferEthForStipends() public onlyIfReady payable{
    require(msg.sender == carSigner);

    transferEthForStipends();
  }

  function transferEthForStipends() internal onlyIfReady  {

    uint amount = 1*(10**17) ;  // 0.1 eth per day should be enough
    //require (carSigner.balance < amount);
    //require(balanceToDistribute >= amount);

    balanceToDistribute -= amount; // ADD SafeMath Library
    carSigner.transfer(amount);
    emit E_TransferEthForStipends(carSigner,amount, now);
  }

  //Distribute earnings to owners
  function distributeEarnings() internal onlyIfReady {
    //If the carSigner is running out of eth for transactions, transfer before distribution
    transferEthForStipends();

    //ETH should also be reserved for recharging fuel at a station. Not considered yet.
    //refuelCar();

    uint earningsPerOwner = balanceToDistribute / owners.length;
    for (uint8 i=0;i<owners.length;i++){
      ownersBalance[owners[i]] += earningsPerOwner; // ADD SafeMath Library
      balanceToDistribute -= earningsPerOwner; // ADD SafeMath Library
    }
  }

  /////////////////////////////////////
  // Functions called by owners
  /////////////////////////////////////

  // Allow an owner to manually distribute earnings, in case there is a pending
  // balance and the car has not ended a rental yet.
  
  
  
  //function triggerDistributeEarnings() public onlyIfReady payable{
    //require(balanceToDistribute >0);

    //Make sure the one calling the function is actually an owner
   // bool isOwner = false;
    //for (uint8 i=0;i<owners.length;i++){
     // if (owners[i] == msg.sender){
     //   isOwner = true;
      //  break;
      //}
   // }
   // require (isOwner);
   // require(owners[0]==msg.sender);
   // distributeEarnings();
 // }

  //Each owner should call this function to withdraw the balance they have pending.
  function withdrawEarnings() public onlyIfReady payable{

    //Make sure the one calling the function is actually an owner
    bool isOwner = false;
    for (uint8 i=0;i<owners.length;i++){
      if (owners[i] == msg.sender){
        isOwner = true;
        break;
      }
    }
    require (isOwner);

    uint balanceToWithdraw = ownersBalance[msg.sender];
    require (balanceToWithdraw > 0);

    ownersBalance[msg.sender] =0;
    msg.sender.transfer(balanceToWithdraw);
  }

}