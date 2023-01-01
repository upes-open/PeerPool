export const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    }
    catch (err) {
      console.error(err);
    }
  };

  export const getProviderOrSigner = async (needSigner = false) => {
    let provider = ethers.getDefaultProvider();

    const {chainId} = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change your network to goerli");
      throw new Error("Change network to goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return provider;
  };