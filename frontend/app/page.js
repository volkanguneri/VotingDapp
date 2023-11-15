"use client";

import Header from "@/components/Header/Header";
import Workflow from "@/components/Workflow/Workflow";
import State from "@/components/State/State";
import Form from "@/components/Form/Form";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Workflow />
      <State />
      <Form />
      <Footer />
    </>
  );
}
