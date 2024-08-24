// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Crowdfunding{
    struct Campaign{
        address creator;
        uint256 goal;
        uint256 pledged;
        uint32 deadline;
        bool claimed;
    }

    mapping(uint256=>Campaign)public campaigns;
    uint256 public campaignCount;

    mapping(uint256=>mapping(address=>uint256)) public pledges;

    event CampaignCreated(uint256 campaignId,address indexed creator,uint256 goal,uint256 deadline);
    event Pleged(uint256 campaignId,address indexed user,uint256 amount);
    event WithdrawnPledge(uint256 campaignId,address indexed user,uint256 amount);
    event FundsClaimed(uint256 campaignId,uint256 amount);
    event RefundIssued(uint256 campaignId,address indexed user,uint256 amount);

     function createCampaign(uint256 _goal, uint32 _duration) external {
        require(_goal > 0, "Goal must be greater than 0");

        campaignCount += 1;
        campaigns[campaignCount] = Campaign({
            creator: msg.sender,
            goal: _goal,
            pledged: 0,
            deadline: uint32(block.timestamp) + _duration,
            claimed: false
        });

        emit CampaignCreated(campaignCount, msg.sender, _goal, uint32(block.timestamp) + _duration);
    }

    function pledge(uint256 _campaignId) external payable{
        Campaign storage campaign=campaigns[_campaignId];
        require(block.timestamp<campaign.deadline,"Campaign has ended");
        require(msg.value>0,"Pledge must be greater than 0");

        campaign.pledged+=msg.value;
        pledges[_campaignId][msg.sender]+=msg.value;

        emit Pleged(_campaignId, msg.sender, msg.value);
    }

    function withdrawPledge(uint256 _campaignId) external{
        Campaign storage campaign=campaigns[_campaignId];
        require(block.timestamp<campaign.deadline,"Campaign has ended");

        uint256 pledgedAmount=pledges[_campaignId][msg.sender];
        require(pledgedAmount>0,"No pledge found");

        pledges[_campaignId][msg.sender]=0;
        campaign.pledged-=pledgedAmount;

        payable(msg.sender).transfer(pledgedAmount);

        emit WithdrawnPledge(_campaignId, msg.sender, pledgedAmount);
    }

    function claimFunds(uint256 _campaignId) external{
        Campaign storage campaign=campaigns[_campaignId];
        require(block.timestamp>=campaign.deadline,"Campaign is still ongoing");
        require(campaign.pledged >= campaign.goal, "Goal not reached");
        require(campaign.creator == msg.sender, "Only the creator can claim funds");
        require(!campaign.claimed, "Funds already claimed");

        campaign.claimed=true;
        payable(campaign.creator).transfer(campaign.pledged);

        emit FundsClaimed(_campaignId, campaign.pledged);
    }

    function refund(uint256 _campaignId) external{
        Campaign storage campaign=campaigns[_campaignId];
        require(block.timestamp >= campaign.deadline, "Campaign is still ongoing");
        require(campaign.pledged < campaign.goal, "Campaign reached its goal");

        uint256 pledgedAmount=pledges[_campaignId][msg.sender];
        require(pledgedAmount>0,"No pledge found");

        pledges[_campaignId][msg.sender]=0;
        payable(msg.sender).transfer(pledgedAmount);

        emit RefundIssued(_campaignId, msg.sender, pledgedAmount);
    }
}