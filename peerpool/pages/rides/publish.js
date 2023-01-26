import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../constants';
import { newRide, getProviderorSigner, connectWallet } from '../../utils/functions';
import Web3Modal from "web3modal";
import { BigNumber, providers, Contract } from "ethers";
import styles from "../../styles/Home.module.css";



export default function publish() {

    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departureTime, setDepartureTime] = useState();
    const [fare, setFare] = useState();
    const [seats, setSeats] = useState()
    const [address, setAddress] = useState("")

    const web3ModalRef = useRef();
    const [walletConnected, setWalletConnected] = useState(false);

    const getProviderorSigner = async (needSigner = false) => {
        const provider = await web3ModalRef.current.connect();
        const web3Provider = new providers.Web3Provider(provider);
        // const address_ = await web3Provider.getAddress();
        // setAddress(address_);
        // console.log(address_)

        const { chainId } = await web3Provider.getNetwork();
        if (chainId !== 5) {
            window.alert("Change the network to Goerli");
            throw new Error("Change the network to Goerli");
        }

        if (needSigner) {
            const signer = web3Provider.getSigner();
            setAddress(await signer.getAddress());
            return signer;
        }
        return web3Provider;
    }

    const connectWallet = async () => {
        try {
            await getProviderorSigner(true);
            setWalletConnected(true);
            // checkUser();
        }
        catch (err) {
            console.error(err);
        }
    };

    const publishRide = async () => {
        try {
            const signer = await getProviderorSigner(true);
            const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            newRide(signer, contract, origin, destination, departureTime, fare, seats);
        }
        catch (err) {
            console.error(err);
        }


    }

    useEffect(() => {
        if (!walletConnected) {
            web3ModalRef.current = new Web3Modal({
                network: "goerli",
                providerOptions: {},
                disableInjectedProvider: false,
            });
        }
    }, [walletConnected]);

    const renderButton = () => {
        if (!walletConnected) {
            return (
                <button className={styles.button} onClick={connectWallet}>Connect your wallet</button>
            );
        }
        else {
            return (
                <div>
                <input type="text" placeholder='origin' onChange={(e) => {
                  setOrigin(e.target.value || "")  
                }}></input>
                 <input type="text" placeholder='destination' onChange={(e) => {
                  setDestination(e.target.value || "")  
                }}></input> <input type="number" placeholder='departure time (24hr)' onChange={(e) => {
                    setDepartureTime(e.target.value || "")  
                  }}></input> <input type="number" placeholder='fare' onChange={(e) => {
                    setFare(e.target.value || "")  
                  }}></input> <input type="number" placeholder='seats' onChange={(e) => {
                    setSeats(e.target.value || "")  
                  }}></input>
                              <button className={styles.button} onClick={publishRide}>Publish Ride</button>

                </div>
            )
        }
    }
    return (
        <div>
            <h1>Publish You Ride</h1>
            {renderButton()}
        </div>
    )
}