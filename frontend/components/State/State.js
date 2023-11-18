"use client";

const State = ({ workflowState }) => {
  console.log(workflowState);
  const h2Styled = {
    textAlign: "center",
    marginBottom: "2em",
    color: "red",
    backgroundColor: "#F9F9F9",
    padding: "1.5em",
    borderRadius: "10px",
  };

  return <h2 style={h2Styled}>{workflowState}</h2>;
};

export default State;
