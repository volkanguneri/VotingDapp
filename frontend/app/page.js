import Header from "@/components/Header/Header";
import Whitelist from "@/components/Whitelist/Whitelist";
import Proposals from "@/components/Proposals/Proposals.js";
import Result from "@/components/Result/Result";
import TallyVote from "@/components/TallyVote/TallyVote";
import Vote from "@/components/Vote/Vote";
import Workflow from "@/components/Workflow/Workflow";
import State from "@/components/State/State";
import GetterVoter from "@/components/GetterVoter/GetterVoter";
import GetterProposal from "@/components/GetterProposal/GetterProposal";

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
      <GetterVoter />
      <Proposals />
      <GetterProposal />
      <Vote />
      <TallyVote />
      <Result />
      {/* </div> */}
    </>
  );
}
