import React, { useEffect, useState } from 'react'
import Home from './Home';

function CheckWallet() {
    const [currentAccount, setCurrentAccount] = useState(null);

    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum) return console.log("Please install metamask");
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            }
            else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const connectWallet = async () => {
        try {
            if (!window.ethereum) {
                return toast.info("Please install MetaMask");
            }
    
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const network = await window.ethereum.request({ method: "net_version" });
    
            // Sepolia network ID is '11155111'
            if (network !== '11155111') {
                return toast.info("Please switch to the Sepolia network");
            }
    
            setCurrentAccount(accounts[0]);
            toast.success("Connected to Sepolia network");
        } catch (error) {
            toast.error("Error in connecting wallet: ",error.message)
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    })
    return (
        <>
            <h1>Crowdfunding DApp</h1>
            {currentAccount ? (
                <>
                    <div>Connected: {currentAccount}</div>
                    <Home />
                </>
            ) : (
                <button onClick={connectWallet}>Connect Wallet</button>
            )}
        </>
    )
}

export default CheckWallet