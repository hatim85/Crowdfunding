import { ethers } from 'ethers';
import React, { useState } from 'react';
import Ethers from './Ethers';
import '../stylesheets/Home.css';
import { toast } from 'react-toastify';

function Home() {
    const [goal, setGoal] = useState('');
    const [duration, setDuration] = useState('');
    const [createCampaignId, setCreateCampaignId] = useState('');
    const [pledgeCampaignId, setPledgeCampaignId] = useState('');
    const [withdrawCampaignId, setWithdrawCampaignId] = useState('');
    const [claimCampaignId, setClaimCampaignId] = useState('');
    const [refundCampaignId, setRefundCampaignId] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const crowdfundingContract = Ethers();

    const handleCreateCampaign = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const transaction = await crowdfundingContract.createCampaign(goal, duration);
            await transaction.wait();
            toast.success("Created campaign successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePledgeToCampaign = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const transaction = await crowdfundingContract.pledge(pledgeCampaignId, {
                value: ethers.utils.parseEther(amount)
            });
            await transaction.wait();
            toast.success("Pledged to campaign successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const withdrawPledge = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const transaction = await crowdfundingContract.withdrawPledge(withdrawCampaignId);
            await transaction.wait();
            toast.success("Pledge withdrawn successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const claimFunds = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const transaction = await crowdfundingContract.claimFunds(claimCampaignId);
            await transaction.wait();
            toast.success("Funds claimed successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const requestRefund = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const transaction = await crowdfundingContract.refund(refundCampaignId);
            await transaction.wait();
            toast.success("Refund issued successfully");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container">
            <div>
                <h2>Create Campaign</h2>
                <form onSubmit={handleCreateCampaign}>
                    <input
                        type="number"
                        placeholder='Goal (ETH)'
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder='Duration (seconds)'
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                    <button type='submit' disabled={isLoading}>Create campaign</button>
                </form>
            </div>
            <div>
                <h2>Pledge to Campaign</h2>
                <form onSubmit={handlePledgeToCampaign}>
                    <input
                        type="number"
                        placeholder='Campaign ID'
                        value={pledgeCampaignId}
                        onChange={(e) => setPledgeCampaignId(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder='Amount (ETH)'
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    <button type='submit' disabled={isLoading}>Pledge</button>
                </form>
            </div>
            <div>
                <h2>Withdraw Pledge</h2>
                <form onSubmit={withdrawPledge}>
                    <input
                        type="number"
                        placeholder='Campaign ID'
                        value={withdrawCampaignId}
                        onChange={(e) => setWithdrawCampaignId(e.target.value)}
                        required
                    />
                    <button type='submit' disabled={isLoading}>Withdraw Pledge</button>
                </form>
            </div>
            <div>
                <h2>Claim Funds</h2>
                <form onSubmit={claimFunds}>
                    <input
                        type="number"
                        placeholder='Campaign ID'
                        value={claimCampaignId}
                        onChange={(e) => setClaimCampaignId(e.target.value)}
                        required
                    />
                    <button type='submit' disabled={isLoading}>Claim Funds</button>
                </form>
            </div>
            <div>
                <h2>Request Refund</h2>
                <form onSubmit={requestRefund}>
                    <input
                        type="number"
                        placeholder='Campaign ID'
                        value={refundCampaignId}
                        onChange={(e) => setRefundCampaignId(e.target.value)}
                        required
                    />
                    <button type='submit' disabled={isLoading}>Request Refund</button>
                </form>
            </div>
        </div>
    );
}

export default Home;
