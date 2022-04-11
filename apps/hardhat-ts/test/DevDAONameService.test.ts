import { expect } from "./chai-setup";
import { ethers, } from "hardhat";
import { Signer } from "ethers";

let service: any;
let token: any;
let oracle: any;
let registry: any;
let deployer: Signer, alice: Signer, treasury: Signer;

describe("Developer DAO Name Service", () => {
  beforeEach(async () => {
    const Nft      = await ethers.getContractFactory("DevDAONFT");
    const Oracle   = await ethers.getContractFactory("DevDAOPriceOracle");
    const Registry = await ethers.getContractFactory("DevDAORegistry");

    token = await Nft.deploy();

    oracle = await Oracle.deploy();
    registry = await Registry.deploy();

    await token.deployed();
    await oracle.deployed();
    await registry.deployed();

    [deployer, alice, treasury] = await ethers.getSigners();

    const NameService = await ethers.getContractFactory("DevDAONameService");
    service = await NameService.deploy(
      token.address,
      registry.address,
      oracle.address,
      await treasury.getAddress(),
    );

    await service.deployed();
  });
  describe("DevDAONameService#mint", () => {
    it("throws when name is too long", async () => {
      try {
        service.connect(alice).mint("A".repeat(10*10));
      } catch (error: any) {
        expect(error.message).eq("DISALLOWED_LENGTH");
      }
    });

    it("throws when name is too short", async () => {
      try {
        service.connect(alice).mint("A");
      } catch (error: any) {
        expect(error.message).eq("DISALLOWED_LENGTH");
      }
    });

    it("mints a token", async () => {
      const name = "alice";
      const value = await oracle.lengthToPrices(name.length);
      await service.connect(alice).mint(name, { value });

      expect(await token.names(0)).eq(name);
    });
  });
});
