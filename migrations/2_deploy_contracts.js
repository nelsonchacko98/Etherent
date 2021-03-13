const Ownable = artifacts.require('Ownable');
const SmartCar = artifacts.require('SmartCar');

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.deploy(SmartCar);
};
