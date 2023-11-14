"use client";

import { Flex } from "../Styles/Flex.styled";
import { H2 } from "../Styles/H2.styled";
import { Input } from "../Styles/Input.styled";
import { Button } from "../Styles/Button.styled";

const Result = () => {
  const resultStyle = {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "2em",
  };

  return (
    <section style={resultStyle}>
      <Button>Result</Button>
    </section>
  );
};

export default Result;
