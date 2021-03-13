pragma solidity ^0.5.16;

import "./safeMath.sol";


contract Ownable {
    mapping(uint256 => Car) public cars;
    mapping(uint256 => User) public users;
    mapping(uint256 => Client) public clients;
    uint256 public carCount = 0;
    uint256 public clientCount = 0;
    uint256 public userCount = 0;

    struct Car {
        uint256 id;
        string Regno;
        string Model;
        string desc;
        uint256 timesRented;
        string Status;
        string Image;
        address payable Owner;
        address payable client;
        uint256 Rate;
    }
    struct User {
        uint256 id;
        string name;
        address user;
        string email;
        bool authorized;
    }

    struct Client {
        uint256 id;
        string bcar;
        string Regno;
        string name;
        string Cphno;
        address payable Client;
        string startDate;
        string endDate;
        uint256 Fare;
    }

    function addCar(
        string memory _RegNo,
        string memory _model,
        string memory _desc,
        string memory _image,
        uint256 _rate
    ) public payable {
        // Increment the car count

        require(msg.value >= _rate * 2);
        carCount++;
        // Add Car
        cars[carCount] = Car(
            carCount,
            _RegNo,
            _model,
            _desc,
            0,
            "Available",
            _image,
            msg.sender,
            address(0x0),
            _rate
        );
    }

    function bookCar(
        uint256 _id,
        string memory _name,
        string memory _Cphno,
        string memory _startDate,
        string memory _endDate,
        uint256 _tFare
    ) public payable {
        Car memory _car = cars[_id];

        require(
            keccak256(abi.encodePacked((_car.Status))) ==
                keccak256(abi.encodePacked(("Available")))
        );

        _car.timesRented = _car.timesRented + 1;
        _car.Status = "Hired";
        _car.client = msg.sender;
        cars[_id] = _car;
        clientCount++;
        clients[clientCount] = Client(
            clientCount,
            _car.Model,
            _car.Regno,
            _name,
            _Cphno,
            msg.sender,
            _startDate,
            _endDate,
            _tFare
        );
    }

    function endRent(uint256 _id) public payable {
        Car memory _car = cars[_id];
        address payable _owner = _car.Owner;
        address(_owner).transfer(5 ether);
        _car.Status = "Available";
        _car.client = address(0x0);
        cars[_id] = _car;
    }

    function authorizeAccount(
        address _address,
        string memory _name,
        string memory _email
    ) public {
        userCount++;
        users[userCount] = User(userCount, _name, _address, _email, true);
    }
}
