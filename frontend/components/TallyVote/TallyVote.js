"use client";

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

  return (
    <section style={tallyStyle}>
      <Button>Tally Votes</Button>
    </section>
  );
};

export default TallyVote;
