import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error(
      "No deployer account. Set DEPLOYER_PRIVATE_KEY in .env.local (testnet burner only).",
    );
  }

  console.log("Network:     Base Sepolia (84532)");
  console.log("Deployer:    ", deployer.address);
  console.log(
    "Balance:     ",
    ethers.formatEther(await ethers.provider.getBalance(deployer.address)),
    "ETH",
  );

  const Token = await ethers.getContractFactory("AdinaTestToken");
  const token = await Token.deploy(deployer.address);
  await token.waitForDeployment();

  const address = await token.getAddress();
  const supply = await token.totalSupply();

  console.log("\n=== ADINA Test Token deployed (NOT mainnet) ===");
  console.log("Name:        ADINA Test");
  console.log("Symbol:      tADINA");
  console.log("Decimals:    18");
  console.log("Total supply:", ethers.formatUnits(supply, 18), "tADINA");
  console.log("Contract:   ", address);
  console.log("Recipient:  ", deployer.address);
  console.log("Explorer:   ", `https://sepolia.basescan.org/address/${address}`);
  console.log("\nNext: set NEXT_PUBLIC_ADINA_TOKEN_ADDRESS=" + address);
  console.log("      and use Base Sepolia in the app for balance reads.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
