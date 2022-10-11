const {ethers, getNamedAccounts} = require("hardhat")
const {ethers, run, network} = require("hardhat")



async function publishride() {
    const { deployer } = await getNamedAccounts()
    const carpooling = await ethers.getContract("carpooling", deployer)
    const newRide = await carpooling.create_ride(
        document.getElementById("origin"),
        document.getElementById("destination"),
        document.getElementById("dtime").toNumber(),
        document.getElementById("seats").toNumber(),
        document.getElementById("price").toNumber(),
    )
}