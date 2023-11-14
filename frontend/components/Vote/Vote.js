"use client";

import { Flex } from "../Styles/Flex.styled";
import { H2 } from "../Styles/H2.styled";
import { Input } from "../Styles/Input.styled";
import { Button } from "../Styles/Button.styled";
import { Section } from "../Styles/Section.styled";

const Vote = () => {
  return (
    <Section>
      <H2>Vote</H2>
      <Flex>
        <Input placeholder="Enter en proposal ID"></Input>
        <Button>Submit</Button>
      </Flex>
    </Section>
  );
};
export default Vote;
