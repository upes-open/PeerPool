import { Contract, utils } from "ethers";
import { useRef } from "react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../constants";


export const checkUser = async () => {
    try {
      const signer = await getProviderorSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const address = await signer.getAddress();
      if (contract.userExists(address) === true) {
        setRegisteredUser(true);
      }
    }
    catch (err) {
      console.error(err);
    }
  }

  export const newRide = async (signer, contract, origin, destination, departureTime, fare, seats) => {
    try {
      const tx = await contract.createride(origin, destination, departureTime, fare, seats);
      // setLoading(true);
      await tx.wait();
      console.log(tx);
      // setLoading(false);
    }
    catch (err) {
      console.error(err);
    }
  }

  export const searchRide = async (_origin, _destination, departureTime, _seats) => {
    try {
      const provider = await getProviderorSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      let rides = [];

      const rideCount = await contract.ridecount();
      setLoading(true);
      for (let i = 0; i < rideCount; i++) {
        let ride = await contract.rides(i);
        if (ride.origin === _origin && ride.destination === _destination && ride.seats >= _seats && ride.departuretime >= departureTime) {
          rides.push(ride);
        }
      }
      setLoading(false);
    }
    catch (err) {
      console.error(err);
    }
  }

  export const _newUser = async(_name, _age, _gender) => {
    try {
      const signer = await getProviderorSigner(true);
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.newUser(_name, _age, _gender);
      setLoading(true);
      await tx.wait();
      setLoading(false);
    }
    catch (err) {
      console.error(err);
    }
  }