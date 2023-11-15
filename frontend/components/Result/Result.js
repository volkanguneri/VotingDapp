"use client";

// React
import { useState } from "react";

// Wagmi
import { readContract } from "@wagmi/core";

// Importations nécessaires
import { abi, contractAddress } from "../../constants/index";

// Styled Components
import { Flex } from "../Styles/Flex.styled";
import { H2 } from "../Styles/H2.styled";
import { Input } from "../Styles/Input.styled";
import { Button } from "../Styles/Button.styled";

const Result = () => {
  const [winningProposalID, setWinningProposalID] = useState("");
  const [proposal, setProposal] = useState(null); // Ajout d'un état pour stocker les données de la proposition

  const resultStyle = {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "2em",
  };

  const displayResult = async () => {
    try {
      const data = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "winningProposalID",
      });
      setWinningProposalID(data);
      getProposal(winningProposalID);
    } catch (err) {
      alert(err.message);
    }
  };

  const getProposal = async () => {
    try {
      const proposalData = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "getOneProposal",
        args: [winningProposalID],
      });

      setProposal(proposalData);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <section style={resultStyle}>
        <Button onClick={displayResult}>Result</Button>
      </section>
      {winningProposalID && (
        <div>
          <H2>Result</H2>
          {proposal ? (
            <ul>
              <li>
                <strong>Description:</strong> {proposal.description.toString()}
              </li>
              <li>
                <strong>Vote Count:</strong> {proposal.voteCount.toString()}
              </li>
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </>
  );
};

export default Result;
