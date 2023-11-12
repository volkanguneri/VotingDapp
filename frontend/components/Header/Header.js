"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { StyledHeader, StyledLogo } from "./Header.styled";

const Header = () => {
  return (
    <StyledHeader>
      <StyledLogo>Logo</StyledLogo>
      <ConnectButton />
    </StyledHeader>
  );
};

export default Header;
