"use client";

// ReactJs
import React, { useEffect, useState } from "react";

// import { useForm } from "react-hook-form";

// React Tostify
import "react-toastify/dist/ReactToastify.css";

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

const Whitelist = () => {
  // Wagmi function / client creation for event listenning
  const client = usePublicClient();

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  // } = useForm();

  const [voter, setVoter] = useState("");

  // Event information
  const [voterRegisteredEvents, setVoterRegisteredEvents] = useState([]);

  // Event handling function
  const getVoterRegisteredEvents = async () => {
    try {
      // get.Logs from viem
      const logs = await client.getLogs({
        address: contractAddress,
        event: parseAbiItem("event VoterRegistered(address voterAddress)"),
        fromBlock: "latest",
        toBlock: "latest",
      });

      // Mise à jour du state avec les événements VoterRegistered
      setVoterRegisteredEvents(logs.map((log) => log.args.voterAddress));
    } catch (err) {
      alert(err.message);
    }
  };

  // Fonction pour ajouter un électeur
  const addVoter = async () => {
    // const initialize = useRef("");

    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "addVoter",
        args: [voter],
      });

      const { hash } = await writeContract(request);
      const data = await waitForTransaction({
        hash: hash,
      });

      getVoterRegisteredEvents();

      alert(`Added Voter Address: ${voter}`);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getVoterRegisteredEvents();
  }, []);

  return (
    <Label>
      <H2>Add Voter</H2>
      <Flex>
        <Input
          placeholder="Enter a voter address"
          value={voter}
          onChange={(e) => setVoter(e.target.value)}
        />
        <Button
          type="button"
          onClick={() => {
            addVoter();
            // handleFormReset();
            // reset();
          }}
        >
          Submit
        </Button>
      </Flex>
    </Label>
  );
};
export default Whitelist;
