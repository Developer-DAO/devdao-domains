import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  let nft: any, oracle: any, registry: any;

  try {
    nft = await deploy("DevDAONFT", {
      from: deployer,
      log: true,
      autoMine: true,
    });
    oracle = await deploy("DevDAOPriceOracle", {
      from: deployer,
      log: true,
      autoMine: true,
    });
    registry = await deploy("DevDAORegistry", {
      from: deployer,
      log: true,
      autoMine: true,
    });
    await deploy("DevDAONameService", {
      from: deployer,
      args: [nft.address, registry.address, oracle.address, deployer],
      log: true,
      autoMine: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export default func;
func.tags = [
  "DevDAONFT",
  "DevDAOPriceOracle",
  "DevDAORegistry",
  "DevDAONameService",
];
