import Header from "@/components/Header/Header";
import Whitelist from "@/components/Whitelist/Whitelist";
import Proposals from "@/components/Proposals/Proposals.js";
import Result from "@/components/Result/Result";
import TallyVote from "@/components/TallyVote/TallyVote";
import Vote from "@/components/Vote/Vote";
import Workflow from "@/components/Workflow/Workflow";
import State from "@/components/State/State";

export default function Home() {
  // const SectionFlex = {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "center",
  // };
  return (
    <>
      <Header />
      <Workflow />
      <State />
      {/* <div> */}
      <Whitelist />
      <Proposals />
      <Vote />
      <TallyVote />
      <Result />
      {/* </div> */}
    </>
  );
}
