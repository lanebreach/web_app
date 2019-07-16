import React, { useContext } from "react";
import { getSubmissions } from "../utils/methods";
import Submission from "./Submission";
import { AppContext } from "../layouts";

const Submissions = () => {
  const { submissions = [] } = useContext(AppContext);
  return (
    <main>
      <h1>Your Submissions</h1>
      {submissions.map(submission => {
        if (submission) {
          return (
            <Submission
              submission={submission}
              key={submission.service_request_id || submission.token}
            />
          );
        }
        return false;
      })}
    </main>
  );
};

export default Submissions;
