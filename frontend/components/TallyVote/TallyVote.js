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

const TallyVote = () => {
  const tallyStyle = {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "2em",
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
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section style={tallyStyle}>
      <Button onClick={tallyVote}>Tally Votes</Button>
    </section>
  );
};

export default TallyVote;
