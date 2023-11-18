"use client";

// ReactJs
import { useState } from "react";

// Wagmi
import {
  prepareWriteContract,
  writeContract,
  waitForTransaction,
} from "@wagmi/core";
// import { useAccount } from "wagmi";

// wagmi / Viem
import { parseAbiItem } from "viem";
import { usePublicClient } from "wagmi";
import { hardhat } from "viem/chains";

// Contract's information
import { abi, contractAddress } from "../../constants/index";

import { Flex } from "../Styles/Flex.styled";
import { H2 } from "../Styles/H2.styled";
import { Input } from "../Styles/Input.styled";
import { Button } from "../Styles/Button.styled";
import { Label } from "../Styles/Label.styled";

const Proposals = () => {
  const [description, setDescription] = useState("");

  // Wagmi function / client creation for event listenning
  const client = usePublicClient();

  // Event information
  const [proposalRegisteredEvents, setProposalRegisteredEvents] = useState([]);

  const addProposal = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "addProposal",
        args: [description],
      });
      const { hash } = await writeContract(request);
      const data = await waitForTransaction({
        hash: hash,
      });

      getProposalRegisteredEvents();

      // const proposalId =
      //   data?.events?.ProposalRegistered?.[0]?.args?.proposalId;

      alert(`Registered Proposal ID: ${proposalId}`);
    } catch (err) {
      alert(err.message);
    }
  };

  // Use UseEffect

  const getProposalRegisteredEvents = async () => {
    try {
      // get.Logs from viem
      const logs = await client.getLogs({
        address: contractAddress,
        event: parseAbiItem("event ProposalRegistered(uint proposalId)"),
        fromBlock: "latest",
        toBlock: "latest",
      });

      // Mise à jour du state avec les événements VoterRegistered
      setProposalRegisteredEvents(logs.map((log) => log.args.proposalId));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Label>
      <H2>Add Proposal</H2>
      <Flex>
        <Input
          placeholder="Enter a proposal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
        <Button type="button" onClick={addProposal}>
          Submit
        </Button>
      </Flex>
    </Label>
  );
};

export default Proposals;
