"use client";

// React
import { useState, useEffect } from "react";

// Wagmi
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
import { abi, contractAddress } from "../../constants/index";
import { usePublicClient } from "wagmi";

// Viem
import { parseAbiItem } from "viem";
import { hardhat } from "viem/chains";

// Import other components
import State from "@/components/State/State";

// Styled Components
import { StyledWorkflow, Button } from "./Workflow.styled";

const Workflow = () => {
  // Event information
  let [workflowState, setWorkflowState] = useState("Registering Voters");
  const [workflowRegisteredEvents, setWorkflowRegisteredEvents] = useState([]);

  // Wagmi function / client creation for event listenning
  const client = usePublicClient();

  const startProposalsRegistering = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "startProposalsRegistering",
      });

      const { hash } = await writeContract(request);
      const data = await waitForTransaction({
        hash: hash,
      });

      getVoterRegisteredEvents();
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

      const data = await waitForTransaction({
        hash: hash,
      });

      getVoterRegisteredEvents();
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

      const data = await waitForTransaction({
        hash: hash,
      });

      getVoterRegisteredEvents();
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

      const data = await waitForTransaction({
        hash: hash,
      });

      getVoterRegisteredEvents();
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

      const data = await waitForTransaction({
        hash: hash,
      });

      getVoterRegisteredEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  // Event handling function
  const getVoterRegisteredEvents = async () => {
    try {
      // Get logs from viem
      const logs = await client.getLogs({
        address: contractAddress,
        event: parseAbiItem(
          "event WorkflowStatusChange(uint8 previousStatus, uint8 newStatus)"
        ),
        fromBlock: "latest",
        toBlock: "latest",
      });

      // Extract newStatus from the logs and update the state
      setWorkflowRegisteredEvents(
        logs.map((log) => log.args.newStatus.toString())
      );
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    switch (workflowRegisteredEvents[0]) {
      case "0":
        setWorkflowState("Registering Voters");
        break;
      case "1":
        setWorkflowState("Registering Proposals Started");
        break;
      case "2":
        setWorkflowState("Registering Proposals Ended");
        break;
      case "3":
        setWorkflowState("Voting Session Started");
        break;
      case "4":
        setWorkflowState("Voting Session Ended");
        break;
      case "5":
        setWorkflowState("Votes Tallied");
        break;
      default:
    }
  }, [workflowRegisteredEvents]);

  return (
    <>
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
      <State workflowState={workflowState} />
    </>
  );
};

export default Workflow;
