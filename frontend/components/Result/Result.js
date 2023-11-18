"use client";

// React
import { useState } from "react";

// Wagmi
import { readContract } from "@wagmi/core";

// Importations nécessaires
import { abi, contractAddress } from "../../constants/index";

// Styled Components
import { H2 } from "../Styles/H2.styled";
import { Button } from "../Styles/Button.styled";
import { Label } from "../Styles/Label.styled";

const Result = () => {
  const [winningProposalID, setWinningProposalID] = useState("");
  const [proposal, setProposal] = useState("");

  // ...

  const displayResult = async () => {
    try {
      const winningProposalID = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "winningProposalID",
      });
      setWinningProposalID(winningProposalID);

      // Only call getProposal if winningProposalID is truthy
      if (winningProposalID) {
        getProposal(winningProposalID);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  // ...

  const getProposal = async (proposalId) => {
    try {
      const proposalData = await readContract({
        address: contractAddress,
        abi: abi,
        functionName: "getOneProposal",
        args: [proposalId],
      });

      setProposal(proposalData);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Label>
      <Button type="button" onClick={displayResult}>
        Result
      </Button>

      {winningProposalID && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1em",
            marginTop: "2em",
            backgroundColor: "#f9f9f9",
            width: "100%",
            borderRadius: "10px",
            paddingBottom: "1em",
            paddingTop: "1em",
          }}
        >
          {proposal ? (
            <ul style={{ listStyle: "none" }}>
              <li>
                <span>Description:</span>{" "}
                <strong>{proposal.description.toString()}</strong>
              </li>
              <li>
                <span>Vote Count:</span>{" "}
                <strong>{proposal.voteCount.toString()}</strong>
              </li>
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </Label>
  );
};

export default Result;
