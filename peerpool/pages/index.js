import Head from "next/head";
import Link from 'next/link';
import Image from 'next/image'

import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { useEffect,useRef, useState } from "react";
import { ethers } from "ethers";


export default function Home() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState("")
  const [registeredUser, setRegisteredUser] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
  const [isRideOwner, setIsRideOwner] = useState(false)
  const web3ModalRef = useRef();


  

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

  const renderButton = () => {
    if(!walletConnected){
            return (
        <button className={styles.button} onClick={connectWallet}>Connect your wallet</button>
      );
    }
    else {
      return (
        <div>
        <Link className={styles.button} href="/rides/book">Book a Ride</Link>
        <Link className={styles.button} href="/rides/publish">Publish a Ride</Link>
        </div>
      )
    }

  };



  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network:"goerli",
        providerOptions:{},
        disableInjectedProvider:false,
      });
    }
  }, [walletConnected]);


  return (
    <div>
      <Head>
        <title>PeerPool</title>
        <meta name="desciption" content="PeerPool"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        <link rel="icon" href="/open logo.png" />
      </Head>
      <div className={styles.main}>
      <a href="https://upes-open.org/" target="_blank" rel="noreferrer">
      <Image src="/open logo.png" className={styles.openlogo} alt="open_logo"></Image>
      </a>
        
      <header className={styles.header}>Address: {address}</header>

        <div>
          <div>
          <h1 className={styles.title}>Welcome to PeerPool</h1>
          {renderButton()}
          </div>
        </div>


        <div>
        </div>
        <div className={styles.socials}>
        <a href="https://github.com/upes-open" target="_blank" rel="noreferrer">
          <Image src="/github.png" alt="spotify" className={styles.logo}></Image>
      </a>
      
      <a href="https://www.instagram.com/upesopen_/" target="_blank" rel="noreferrer">
        <Image src="/instagram.png" alt="instagram" className={styles.logo}></Image>
    </a>
    <a href="https://www.linkedin.com/company/open-community/mycompany/" target="_blank" rel="noreferrer">
          <Image src="/linkedin.png" alt="linkedin" className={styles.logo}></Image>
      </a>

      </div>
      </div>
     
    </div>
  );


}


