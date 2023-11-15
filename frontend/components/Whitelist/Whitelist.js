"use client";

// ReactJs
import { useState } from "react";

// Wagmi
import { prepareWriteContract, writeContract } from "@wagmi/core";
// import { useAccount } from "wagmi";

// Contract's information
import { abi, contractAddress } from "../../constants/index";

import { Flex } from "../Styles/Flex.styled";
import { H2 } from "../Styles/H2.styled";
import { Input } from "../Styles/Input.styled";
import { Button } from "../Styles/Button.styled";
import { Label } from "../Styles/Label.styled";

const Whitelist = () => {
  const [voter, setVoter] = useState("");

  // Add Voter Function
  const addVoter = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "addVoter",
        args: [voter],
      });
      const { hash } = await writeContract(request);
      alert("Contract written");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Label>
      <H2>Add Voter</H2>
      <Flex>
        <Input
          placeholder="Enter a voter address"
          value={voter}
          onChange={(e) => setVoter(e.target.value)}
        ></Input>
        <Button onClick={addVoter}>Submit</Button>
      </Flex>
    </Label>
  );
};

export default Whitelist;
