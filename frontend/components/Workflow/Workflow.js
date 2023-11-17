"use client";

// React
import { useState } from "react";

// Wagmi
import { prepareWriteContract, writeContract } from "@wagmi/core";
import { abi, contractAddress } from "../../constants/index";

// Styled Components
import { StyledWorkflow, Button } from "./Workflow.styled";

const Workflow = () => {
  const [workflowStatus, setWorkflowStatus] = useState("");

  const startProposalsRegistering = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "startProposalsRegistering",
      });

      const { hash } = await writeContract(request);
      alert("Contract written");

      // Mettez à jour l'état
      setWorkflowStatus("ProposalsRegistrationStarted");
    } catch (err) {
      alert(err.message);
    }
  };
  const endProposalsRegistering = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "endProposalsRegistering",
      });

      const { hash } = await writeContract(request);
      alert("Contract written");

      // Mettez à jour l'état
      setWorkflowStatus("ProposalsRegistrationEnded");
    } catch (err) {
      alert(err.message);
    }
  };

  const startVotingSession = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "startVotingSession",
      });

      const { hash } = await writeContract(request);
      alert("Contract written");

      setWorkflowStatus("startVotingSession");
    } catch (err) {
      alert(err.message);
    }
  };

  const endVotingSession = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "endVotingSession",
      });

      const { hash } = await writeContract(request);
      alert("Contract written");

      setWorkflowStatus("endVotingSession");
    } catch (err) {
      alert(err.message);
    }
  };

  const tallyVote = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "tallyVotes",
      });

      const { hash } = await writeContract(request);
      alert("Contract written");

      setWorkflowStatus("VotesTallied");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <StyledWorkflow>
      <Button type="button">Registering Voters</Button>
      <Button type="button" onClick={startProposalsRegistering}>
        Proposals Registration Started
      </Button>
      <Button type="button" onClick={endProposalsRegistering}>
        Proposals Registration Ended
      </Button>
      <Button type="button" onClick={startVotingSession}>
        Voting Session Started
      </Button>
      <Button type="button" onClick={endVotingSession}>
        Voting Session Ended
      </Button>
      <Button type="button" onClick={tallyVote}>
        Votes Tallied
      </Button>
    </StyledWorkflow>
  );
};

export default Workflow;
