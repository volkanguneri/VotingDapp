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
import { Section } from "../Styles/Section.styled";

const Whitelist = () => {
  const [voter, setVoter] = useState("");

  // ABI encoding params/values length mismatch.
  // Expected length (params): 1
  // Given length (values): 0
  // Version: viem@1.18

  // Add Voter Function
  const addVoter = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "addVoter",
        value: { voter },
      });
      const { hash } = await writeContract(request);
      alert("tout va bien");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Section>
      <H2>Add Voter</H2>
      <Flex>
        <Input
          placeholder="Enter a voter address"
          value={voter}
          onChange={(e) => setVoter(e.target.value)}
        ></Input>
        <Button onClick={addVoter}>Submit</Button>
      </Flex>
    </Section>
  );
};

export default Whitelist;
