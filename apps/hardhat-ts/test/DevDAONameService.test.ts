import { expect } from "./chai-setup";
import { ethers, deployments } from "hardhat";
import { Signer } from "ethers";
import {
  DevDAONameService,
  DevDAONFT,
  DevDAOPriceOracle,
  DevDAORegistry,
} from "../../web/src/typechain";

let service: any;
let token: any;
let oracle: any;
let registry: any;
let deployer: Signer, alice: Signer, treasury: Signer;

const setup = deployments.createFixture(async () => {
  await deployments.fixture("DevDAONFT");
  await deployments.fixture("DevDAOPriceOracle");
  await deployments.fixture("DevDAORegistry");
  await deployments.fixture("DevDAONameService");

  const contracts = {
    token: await ethers.getContract("DevDAONFT"),
    oracle: await ethers.getContract("DevDAOPriceOracle"),
    registry: await ethers.getContract("DevDAORegistry"),
    service: await ethers.getContract("DevDAONameService"),
  };

  return {
    ...contracts,
    users: await ethers.getSigners(),
  };
});

describe("Developer DAO Name Service", () => {
  describe("DevDAONameService#mint", () => {
    it("throws when name is too long", async () => {
      const {
        service,
        users: [alice],
      } = await setup();
      try {
        service.connect(alice).mint("A".repeat(10 * 10));
      } catch (error: any) {
        expect(error.message).eq("DISALLOWED_LENGTH");
      }
    });

    it("throws when name is too short", async () => {
      const {
        service,
        users: [alice],
      } = await setup();
      try {
        service.connect(alice).mint("A");
      } catch (error: any) {
        expect(error.message).eq("DISALLOWED_LENGTH");
      }
    });

    it("mints a token", async () => {
      const {
        token,
        oracle,
        service,
        users: [alice],
      } = await setup();

      const name = "alice";
      const value = await oracle.lengthToPrices(name.length);
      await service.connect(alice).mint(name, { value });

      expect(await token.names(1)).eq(name);
    });
  });
});
