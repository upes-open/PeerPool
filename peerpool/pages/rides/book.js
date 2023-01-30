import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Web3Modal from "web3modal";
import {  ethers } from "ethers";
import styles from "../../styles/Home.module.css";
export default function Book() {
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [departureTime, setDepartureTime] = useState();
    const [fare, setFare] = useState();
    const [seats, setSeats] = useState()
    const [address, setAddress] = useState("")
    const [loading, setLoading] = useState(false)

    const web3ModalRef = useRef();
    const [walletConnected, setWalletConnected] = useState(true);
    const book_ = async () => {

    }

    const getProviderorSigner = async (needSigner = false) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // const provider = new ethers.providers.JsonRpcProvider(networks[5].provider);
        await provider.send('eth_requestAccounts', []);

        const { chainId } = await provider.getNetwork();
        if (chainId !== 5) {
            window.alert("Change the network to Goerli");
            throw new Error("Change the network to Goerli");
        }

        if (needSigner) {
            const signer = provider.getSigner();
            setAddress(await signer.getAddress());
            return signer;
        }
        return provider;
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
        else if (loading) {
            return (
                <div>
                <h1>Loading...</h1>
                </div>
            )
        }
        else {
            return (
                <div className="container">
                    <div className="title">Book A Ride</div>
                    <div className="content">
                        <form action="#">
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Origin</span>
                                    <input type="text" placeholder="Enter your Origin" required onChange={(e) => {
                                        setOrigin(e.target.value || "")
                                    }}></input>
                                </div>
                                <div className="input-box">
                                    <span className="details">Destination</span>
                                    <input type="text" placeholder="Enter your Destination" required onChange={(e) => {
                                        setDestination(e.target.value || "")
                                    }}></input>
                                </div>
                                <div className="input-box">
                                    <span className="details">Departure Time</span>
                                    <input type="text" placeholder="Enter time in 24hr format" required onChange={(e) => {
                                        setDepartureTime(e.target.value || "")
                                    }}></input>
                                </div>
                                <div className="input-box">
                                    <span className="details">Seats Available</span>
                                    <input type="number" placeholder="Choose Seats Available" required onChange={(e) => {
                                        setSeats(e.target.value || "")
                                    }}></input>
                                </div>
                                <div className="input-box">
                                    <span className="details">Fare</span>
                                    <input type="text" min="0" step="any" placeholder="Enter your Number" required onChange={(e) => {
                                        setFare(e.target.value || "")
                                    }}></input>
                                </div>

                            </div>

                            <div className="button">
                                <input type="submit" value="Search"></input>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }
    return (
        <div>
            {renderButton()}
        </div>
    )
}