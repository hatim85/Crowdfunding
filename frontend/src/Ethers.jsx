import { ethers } from 'ethers';
import { contractAddress, contractABI } from './config';

function Ethers() {
    // console.log(ethers)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    // const nonce = provider.getTransactionCount(Wallet.address);
    // console.log("Nonce:", nonce);
    return new ethers.Contract(contractAddress, contractABI, signer);
}

export default Ethers