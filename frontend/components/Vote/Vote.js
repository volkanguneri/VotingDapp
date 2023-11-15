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

const Vote = () => {
  const [proposalId, setProposalId] = useState("");

  const setVote = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "setVote",
        args: [proposalId],
      });
      const { hash } = await writeContract(request);
      alert("Contract written");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Section>
      <H2>Vote</H2>
      <Flex>
        <Input
          placeholder="Enter en proposal ID"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
        ></Input>
        <Button onClick={setVote}>Submit</Button>
      </Flex>
    </Section>
  );
};
export default Vote;
