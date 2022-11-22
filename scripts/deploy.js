const {ethers, run, network} = require("hardhat")

async function main() {
  const carpoolFactory = await ethers.getContractFactory("carpooling")
  console.log("Deploying contract...")
  const carpooling = await carpoolFactory.deploy()
  await carpooling.deployed()
  console.log(`Deployed contract to: ${carpooling.address}`)
  if(network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
    await carpooling.deployTransaction.wait(6)
    await verify(carpooling.address, [])
  }

}

async function verify(contractAddress, args) {
  console.log("verifying contract")
  try {
    await run("verify:verify", {
      address: contractAddress,
      contructorArguments: args,
    })
  }
  catch (e) {
    if(e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified")
    }
    else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });