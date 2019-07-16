import React, { useContext, useState } from "react";
import styled from "styled-components";
import { convertToken, getSubmissions } from "../utils/methods";
import { AppContext } from "../layouts";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
  margin: 10px;

  img {
    height: 5rem;
    width: 5rem;
    margin-right: 12px;
  }
  .retry-div {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    height: 5rem;
    button {
      height: 35px;
      width: 35px;
      background: none;
      border: 1px solid black;
      border-radius: 5px;
      margin-right: 5px;
      svg {
        display: block;
        height: 20px;
        width: 20px;
      }
    }
  }
`;

const Redo = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="far"
    data-icon="redo-alt"
    class="svg-inline--fa fa-redo-alt fa-w-16"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M483.515 28.485L431.35 80.65C386.475 35.767 324.485 8 256.001 8 119.34 8 7.9 119.525 8 256.185 8.1 393.067 119.095 504 256 504c63.926 0 122.202-24.187 166.178-63.908 5.113-4.618 5.353-12.561.482-17.433l-19.738-19.738c-4.498-4.498-11.753-4.785-16.501-.552C351.787 433.246 306.105 452 256 452c-108.321 0-196-87.662-196-196 0-108.321 87.662-196 196-196 54.163 0 103.157 21.923 138.614 57.386l-54.128 54.129c-7.56 7.56-2.206 20.485 8.485 20.485H492c6.627 0 12-5.373 12-12V36.971c0-10.691-12.926-16.045-20.485-8.486z"
    />
  </svg>
);

const Submission = ({ submission }) => {
  const {
    address,
    description,
    lat,
    long,
    media_url,
    requested_datetime,
    service_code,
    service_name,
    service_request_id,
    status,
    updated_datetime
  } = submission;
  const [pending, setPending] = useState(false);
  const domain = process.env.GATSBY_311_URL;
  console.log(submission);
  const isConverted = !submission.token || service_request_id;
  const { submissions, setSubmissions } = useContext(AppContext);
  console.log(submissions);
  return (
    <StyledDiv>
      {!isConverted ? (
        <div className="retry-div">
          <button
            onClick={() => {
              setPending(true);
              convertToken(submission.token).then(submissions => {
                setSubmissions(submissions);
                setPending(false);
              });
            }}
            disabled={pending}
            type="button"
          >
            <Redo />
          </button>
          <span>Submission failed. Click to retry</span>
        </div>
      ) : (
        <>
          <a href={`${domain}/reports/${service_request_id}`}>
            <img src={media_url} alt="thumbnail" />
          </a>
          <div>
            <a href={`${domain}/reports/${service_request_id}`}>
              <strong>{address}</strong>
            </a>
            <p>{description}</p>
          </div>
        </>
      )}
    </StyledDiv>
  );
};
export default Submission;
