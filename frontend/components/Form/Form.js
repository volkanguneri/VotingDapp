"use client";

import Whitelist from "@/components/Whitelist/Whitelist";
import Proposals from "@/components/Proposals/Proposals.js";
import Result from "@/components/Result/Result";
import Vote from "@/components/Vote/Vote";
import GetterVoter from "@/components/GetterVoter/GetterVoter";
import GetterProposal from "@/components/GetterProposal/GetterProposal";

// Styled Components
import { StyledForm } from "@/components/Styles/Form.styled";

const Form = () => {
  return (
    <StyledForm>
      <Whitelist />
      <GetterVoter />
      <Proposals />
      <GetterProposal />
      <Vote />
      <Result />
    </StyledForm>
  );
};

export default Form;
