import React from "react";
import { getSubmissions } from "../utils/methods";
import Submission from "./Submission";

class Submissions extends React.Component {
  state = {
    submissions: []
  };
  componentDidMount() {
    this.setState({ submissions: getSubmissions() });
  }
  render() {
    const { submissions } = this.state;
    return (
      <main>
        <h1>Your Submissions</h1>
        {submissions.map(submission => {
          return <Submission submission={submission} />;
        })}
      </main>
    );
  }
}

export default Submissions;
