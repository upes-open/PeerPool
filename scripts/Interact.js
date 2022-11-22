const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const {ethers, run, network} = require("hardhat")
const contract = require("../artifacts/contracts/carpooling.sol/carpooling.json")

// provider (Alchemy)
const alchemyProvider = new ethers.providers.AlchemyProvider("goerli", API_KEY)
// signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider)

// contract instance
const carpoolingContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer)
let newRidee;
async function main() {
    // newRidee = await carpoolingContract.createride("la", "nyc", 0100, 3, 4);
    // await newRidee.wait()
    let ridedetail;
    for (i = 0 ; i < 10; i++) {
        ridedetail = await carpoolingContract.rides(i)
        console.log(ridedetail.toString())
    }
    // const ridesss = await carpoolingContract.rides(0);
    // console.log(ridesss.toString())
    // const newridess = await carpoolingContract.rides(1);
    // console.log(newridess.toString())
    // const newridesss = await carpoolingContract.rides(2);
    // console.log(newridesss.toString())
    // const rideowner = await carpoolingContract.rideowner(0)
    // console.log(rideowner.toString())
    // const search = await carpoolingContract.searchride("delhi", "mumbai");
    // console.log("search");
}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


