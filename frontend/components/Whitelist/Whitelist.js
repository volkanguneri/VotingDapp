"use client";

import { useAccount } from "wagmi";

import { StyledWhitelist } from "./Whitelist.styled";

import { Input } from "postcss";

const Whiteliste = () => {
  const { address, isConnected } = useAccount();

  return (
    <StyledWhitelist>
      {isConnected ? (
        <p>Connected</p>
      ) : (
        <div>
          <p>Voter Address</p>
          <input placeholder="Enter the voter address"></input>
        </div>
      )}
    </StyledWhitelist>
  );
};

export default Whiteliste;
