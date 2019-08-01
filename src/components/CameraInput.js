import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const Label = styled.label`
  width: 80vw;
  display: flex;
  margin-top: auto;
  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 400px;
    margin: auto;
    height: 200px;
    height: -webkit-fill-available;
    justify-content: space-evenly;
  }
  button[title="Media"],
  button[title="Camera"] {
    svg {
      left: calc(50% + 75px);
    }
    height: 30vw;
    width: 30vw;
    max-height: 300px;
    max-width: 300px;
    background: white;
    padding: 2rem;
    border: 4px solid black;
    border-radius: 100%;
    filter: invert(1);
  }
  input {
    display: none;
    background-color: white;
  }
`;

const CameraInput = ({ inputRef, onChange }) => {
  const [preferCamera, setPreferCamera] = useState(true);
  return (
    <Label htmlFor="camera-input">
      <div class="row">
        <button
          onClick={() => {
            setPreferCamera(true);
            inputRef?.current?.click();
          }}
          type="button"
          title="Camera"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="camera"
            className="svg-inline--fa fa-camera fa-w-16 fa-2x "
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M342.7 144H464v288H48V144h121.3l24-64h125.5l23.9 64zM324.3 32h-131c-20 0-37.9 12.4-44.9 31.1L136 96H48c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V144c0-26.5-21.5-48-48-48h-88l-14.3-38c-5.8-15.7-20.7-26-37.4-26zM256 408c-66.2 0-120-53.8-120-120s53.8-120 120-120 120 53.8 120 120-53.8 120-120 120zm0-192c-39.7 0-72 32.3-72 72s32.3 72 72 72 72-32.3 72-72-32.3-72-72-72z"
            />
          </svg>
        </button>
        <button
          onClick={() => {
            setPreferCamera(false);
            inputRef?.current?.click();
          }}
          type="button"
          title="Media"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fal"
            data-icon="image"
            className="svg-inline--fa fa-image fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 336c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V112c0-8.822 7.178-16 16-16h416c8.822 0 16 7.178 16 16v288zM112 232c30.928 0 56-25.072 56-56s-25.072-56-56-56-56 25.072-56 56 25.072 56 56 56zm0-80c13.234 0 24 10.766 24 24s-10.766 24-24 24-24-10.766-24-24 10.766-24 24-24zm207.029 23.029L224 270.059l-31.029-31.029c-9.373-9.373-24.569-9.373-33.941 0l-88 88A23.998 23.998 0 0 0 64 344v28c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-92c0-6.365-2.529-12.47-7.029-16.971l-88-88c-9.373-9.372-24.569-9.372-33.942 0zM416 352H96v-4.686l80-80 48 48 112-112 80 80V352z"
            />
          </svg>
        </button>
      </div>
      <input
        type="file"
        accept="image/*"
        capture={preferCamera ? "environment" : false}
        name="camera-input"
        ref={inputRef}
        onChange={onChange}
      />
    </Label>
  );
};
export default CameraInput;
