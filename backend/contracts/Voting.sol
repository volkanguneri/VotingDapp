// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/** 
* @title This is a simple Voting contract which uses Openzeppelin Ownable contract 
* @author Alyra 
*/

contract Voting is Ownable {


    uint public winningProposalID;
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    struct Proposal {
        string description;
        uint voteCount;
    }

    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;
    Proposal[] proposalsArray;
    mapping (address => Voter) voters;


    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted (address voter, uint proposalId);

    constructor() Ownable(msg.sender) {    }
    
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }
    
    /** @dev on peut faire un modifier pour les états */

    // ::::::::::::: GETTERS ::::::::::::: //

    /**
     *   @notice any voter can access to other voters information
     *   @param _addr voter's address
     *   @return Voter struct containing bool isRegistered, bool hasVoted, uint votedProposalId variables;
     */
    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }
    
       /**
       * @notice any voter can access to all proposals
       * @dev proposal id is proposalsArray.length - 1;
       * @param _id proposal's id
       * @return Proposal struct containing string description and uint votecount
        */

    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

 
    // ::::::::::::: REGISTRATION ::::::::::::: // 

    /**
     *  @notice only the owner of the contract can add voters only during RegisteringVoters state. This function can be accesses externally. 
     *  @param _addr the address of th new voter
     */

    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');
    
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
 

    // ::::::::::::: PROPOSAL ::::::::::::: // 

    /**
    * @notice Only voters can add proposals during the proposals registration session. This function can be accessed only externally. 
    * @dev a new proposal struct is created and added to proposalsArray with an index number. This emits ProposalRegistered event.
    * @dev a maximum proposal amount is fixed to less than 1000 to avoid a Dos gas limit attack. If more than 1000 proposals needed, the logic has * to be reviewed. 
    * @param _desc is the proposal description in string stored in calldata for optimisation
    */

    function addProposal(string calldata _desc) external onlyVoters {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(proposalsArray.length < 1000, "The maximum proposal amount is reached");
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer'); // facultatif
        // voir que desc est different des autres

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        // proposalsArray.push(Proposal(_desc,0));
        emit ProposalRegistered(proposalsArray.length-1);
    }

    // ::::::::::::: VOTE ::::::::::::: //

    /**
    * @notice Only voters can add proposals during the proposals registration session.Emits ProposalRegistered event evry time that a new proposal * registered. 
    * @param _id is the proposal description in string stored in calldata for optimisation
    */

    function setVote( uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found'); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount += 1;

        emit Voted(msg.sender, _id);
    }

    // ::::::::::::: STATE ::::::::::::: //

    /**
    * @notice Only owner can start proposal registering if voters are already registered.  
    * @dev This function creates a genesis proposal indexed to 0 so that any blank vote is not counted for the proposal [0]. 
    */

    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        
        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);
        
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    /**
    * @notice Only owner can end proposal registering if the proposals registration is already started.  
    */

    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    /**
    * @notice Only owner can start voting session if the proposals registration is already ended.  
    */

    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }
    /**
    * @notice Only owner can end voting session if the voting session is already started.  
    */

    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }

    /**
    * @notice Only owner can tally votes if the voting session is already ended.  
    * @dev a _winningProposalId is temporarly created for the for loop for optimisation.
    * @dev a maximum proposal amount is fixed to less than 1000 to avoid a Dos gas limit attack. If more than 1000 proposals needed, the logic has * to be reviewed. 
    */

   function tallyVotes() external onlyOwner {
       require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");
       require(proposalsArray.length < 1000, "The maximum proposal amount is reached");
       uint _winningProposalId;
      for (uint256 p = 0; p < proposalsArray.length; p++) {
           if (proposalsArray[p].voteCount > proposalsArray[_winningProposalId].voteCount) {
               _winningProposalId = p;
          }
       }
       winningProposalID = _winningProposalId;
       
       workflowStatus = WorkflowStatus.VotesTallied;
       emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}