import React from "react";
import { getSubmissions } from "../utils/methods";
import Submission from "./Submission";

class Submissions extends React.Component {
  state = {
    submissions: []
  };
  componentDidMount() {
    const storedSubmissions = getSubmissions();
    const pending = storedSubmissions.filter(
      submission => submission?.type === "successful-submission"
    );

    this.setState({ submissions: getSubmissions() });
  }
  render() {
    const { submissions } = this.state;
    return (
      <main>
        <h1>Your Submissions</h1>
        {submissions.map(submission => {

          if(submission){
            return (
            <Submission
              submission={submission}
              key={submission.service_request_id || submission.token}
            />
          )
          }
          return false;
        })}
      </main>
    );
  }
}

export default Submissions;
