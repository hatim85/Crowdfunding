import { ethers } from 'ethers';
import { contractAddress, contractABI } from './config';
import {toast} from 'react-toastify'

function Ethers() {
    if(!window.ethereum) toast.info("Please install Metamask");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
}

export default Ethers