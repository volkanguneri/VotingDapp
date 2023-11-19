// components/Form/Form.js
import React, { useRef } from "react";
import GetterVoter from "@/components/GetterVoter/GetterVoter";
import Proposals from "@/components/Proposals/Proposals.js";
import GetterProposal from "@/components/GetterProposal/GetterProposal";
import Vote from "@/components/Vote/Vote";
import Result from "@/components/Result/Result";
import Whitelist from "@/components/Whitelist/Whitelist";
import { StyledForm } from "@/components/Styles/Form.styled";

const Form = () => {
  const formRef = useRef(null);

  const handleFormReset = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <StyledForm onSubmit={(e) => e.preventDefault()}>
      <Whitelist handleFormReset={handleFormReset} />
      <GetterVoter />
      <Proposals />
      <GetterProposal />
      <Vote />
      <Result />
    </StyledForm>
  );
};

export default Form;
