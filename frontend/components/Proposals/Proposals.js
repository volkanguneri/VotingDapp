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

const Proposals = () => {
  const [description, setDescription] = useState("");

  const addProposal = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "addProposal",
        args: [description],
      });
      const { hash } = await writeContract(request);
      alert("Contract written");
      // setDescription([...description, description]);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Section>
      <H2>Add Proposal</H2>
      <Flex>
        <Input
          placeholder="Enter a proposal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></Input>
        <Button onClick={addProposal}>Submit</Button>
      </Flex>
    </Section>
  );
};

export default Proposals;
