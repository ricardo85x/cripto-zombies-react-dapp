const ZombieFactory = artifacts.require("./ZombieFactory.sol");
const ZombieFeeding = artifacts.require("./ZombieFeeding.sol");
const ZombieHelper = artifacts.require("./ZombieHelper.sol");
const ZombieAttack = artifacts.require("./ZombieAttack.sol");
const ZombieOwnership = artifacts.require("./ZombieOwnership.sol");

module.exports = function(deployer) {
  deployer.deploy(ZombieFactory);
  deployer.deploy(ZombieFeeding);
  deployer.deploy(ZombieHelper);
  deployer.deploy(ZombieAttack);
  deployer.deploy(ZombieOwnership);
};