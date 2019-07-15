import React, { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import Layout, { AppContext } from "../layouts";
import { navigate } from "gatsby";
import { Main } from "./UserForm";
import { submitRequest } from "../utils/methods";
import { Link } from "@reach/router";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";

const Categories = () => {
  let categories = [
    "Private vehicle",
    "Delivery truck",
    "Moving truck",
    "FedEx",
    "UPS",
    "USPS",
    "Bus",
    "Commuter Shuttle",
    "Uber",
    "Lyft",
    "Uber/Lyft"
  ];
  return (
    <>
      {categories.map((category, idx) => (
        <option key={`${category}_${idx}`}>{category}</option>
      ))}
    </>
  );
};

const PreviewImage = styled.img`
  max-height: 40vh;
  display: block;
`;

const StyledForm = styled.form`
  margin-bottom: 24px;
`;

const ComplaintForm = () => {
  const [open, setOpen] = React.useState(false);
  const [init, setInit] = useState(false);
  const [other, setOther] = useState("Other");
  const [position, setPosition] = useState();
  const lat = position?.coords?.latitude;
  const long = position?.coords?.longitude;
  const categoryRef = useRef();

  const {
    description,
    category,
    setCategory,
    setDescription,
    image,
    setImage,
    user,
    reset,
    triggerSuccess
  } = useContext(AppContext);

  const handleSubmit = e => {
    e.preventDefault();
    const category = categoryRef?.current?.querySelector("#category")?.value;
    const date = Date.now();

    if (image) {
      const report = {
        category,
        description,
        lat,
        long,
        date,
        image,
        ...user
      };
      console.log("submitting request");
      submitRequest(report, triggerSuccess, reset);
    }
  };

  useEffect(() => {
    if (!init) {
      setInit(true);
      try {
        window.navigator.geolocation.getCurrentPosition(position => {
          setPosition(position);
        });
      } catch (err) {
        console.error(err);
      }
    }
  });
  return (
    <Main>
      <h2>Submission</h2>
      <StyledForm onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            onChange={e => {
              if (e.target.value === other) {
                setOther(prompt("Other Category"));
              }
              setCategory(e.target.value);
            }}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            native={true}
            ref={categoryRef}
            inputProps={{
              name: "category",
              id: "category"
            }}
            value={category}
          >
            <Categories />
            <option id="other" label={other ? `Other: ${other}` : `Other`}>
              {other}
            </option>
          </Select>
        </FormControl>
        <FormControl className="formControl">
          <InputLabel htmlFor="description">Description</InputLabel>
          <Input
            id="description"
            multiline={true}
            rows="4"
            variant="outlined"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          disabled={!position}
        >
          Submit
        </Button>
        {!position ? <p>Please wait while we identify your location</p> : null}
      </StyledForm>
      <div>
        {image ? (
          <>
            Here is the image you're submitting:
            <PreviewImage src={image} alt="captured image" />
            <br />
            Reset:{" "}
            <Button
              variant="outlined"
              color="primary"
              type="submit"
              type="reset"
              onClick={() => {
                setImage("");
                navigate("/");
              }}
            >
              Reset
            </Button>
          </>
        ) : (
          <>
            You haven't captured an image yet.{" "}
            <a
              onClick={e => {
                e.preventDefault();
                navigate("/");
              }}
              href=""
            >
              Take a photo
            </a>
          </>
        )}
      </div>
    </Main>
  );
};
export default ComplaintForm;
