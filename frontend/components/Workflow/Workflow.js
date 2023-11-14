"use client";

import { StyledWorkflow, Button } from "./Workflow.styled";

const Workflow = () => {
  return (
    <StyledWorkflow>
      <Button>Registering Voters</Button>
      <Button>Proposals Registration Started</Button>
      <Button>Proposals Registration Ended</Button>
      <Button>Voting Session Started</Button>
      <Button>Voting Session Ended</Button>
      <Button>Votes Tallied</Button>
    </StyledWorkflow>
  );
};

export default Workflow;
