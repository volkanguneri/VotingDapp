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

const GetterVoter = () => {
  const [voter, setVoter] = useState("");
  const [contractData, setContractData] = useState(null);

  const getVoter = async () => {
    try {
      const data = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "getVoter",
        args: [voter],
      });
      setContractData(data); // Update state with contract data
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Flex>
      <H2>Get Voter</H2>
      <Input
        placeholder="Enter the voter address"
        value={voter}
        onChange={(e) => setVoter(e.target.value)}
      ></Input>
      <Button onClick={getVoter}>Submit</Button>

      {/* Render contract data if available */}

      {contractData && (
        <div>
          <H2>Voter Information </H2>
          <ul>
            <li>
              {/* <strong>Has Voted:</strong> */}
              {contractData.hasVoted ? (
                <strong>This voter has already voted</strong>
              ) : (
                <strong>This voter has not voted yet</strong>
              )}
            </li>
            <li>
              {contractData.isRegistered ? (
                <strong>This voter is already registered</strong>
              ) : (
                <strong>This voter is not registered yet</strong>
              )}
            </li>

            {contractData.hasVoted ? (
              <li>
                <strong>
                  The voter's voted proposal id is{" "}
                  {contractData.votedProposalId}
                </strong>
              </li>
            ) : null}
          </ul>
        </div>
      )}
    </Flex>
  );
};

export default GetterVoter;
