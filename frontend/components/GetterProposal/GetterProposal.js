"use client";

// ReactJs
import { useState } from "react";

// Wagmi
import { readContract } from "@wagmi/core";

// import { useAccount } from "wagmi";

// Contract's information
import { abi, contractAddress } from "../../constants/index";

// React Styled Components
import { Flex } from "../Styles/Flex.styled";
import { H2 } from "../Styles/H2.styled";
import { Input } from "../Styles/Input.styled";
import { Button } from "../Styles/Button.styled";

// ... Importations nécessaires ...

const GetterProposal = () => {
  const [proposalId, setProposalId] = useState("");
  const [contractData, setContractData] = useState(null);

  const getProposal = async () => {
    try {
      const data = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "getOneProposal",
        args: [proposalId],
      });
      setContractData(data);
      console.log(contractData.voteCount);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Flex>
      <H2>Get Proposal</H2>
      <Input
        placeholder="Enter the proposal ID"
        value={proposalId}
        onChange={(e) => setProposalId(e.target.value)}
      ></Input>
      <Button onClick={getProposal}>Submit</Button>

      {contractData && (
        <div>
          <H2>Proposal Information </H2>
          <ul>
            <li>
              <strong>Description:</strong> {contractData.description}
            </li>
            <li>
              <strong>Vote Count:</strong> {contractData.voteCount.toString()}
            </li>
          </ul>
        </div>
      )}
    </Flex>
  );
};

export default GetterProposal;
