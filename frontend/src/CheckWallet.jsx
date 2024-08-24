import React, { useEffect, useState } from 'react'
import Ethers from './Ethers'
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
            if (!window.ethereum) return console.log("Please install metamask");
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0])
        } catch (error) {
            console.log(error);
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