import React, { useContext, useState, useEffect } from "react";
import { getSubmissions } from "../utils/methods";
import Submission from "./Submission";
import { AppContext } from "../layouts";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [init, setInit] = useState(false);
  useEffect(() => {
    if (!init) {
      setSubmissions(getSubmissions());
      setInit(true);
    }
  });
  return (
    <main>
      <h1>Your Submissions (Feature under development)</h1>
      {submissions?.map(submission => {
        if (submission) {
          return (
            <Submission
              submissions={submissions}
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
