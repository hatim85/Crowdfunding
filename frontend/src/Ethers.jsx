import { ethers } from 'ethers';
import { contractAddress, contractABI } from './config';

function Ethers() {
    if(!window.ethereum) throw new Error("Metamask is not installed");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
}

export default Ethers