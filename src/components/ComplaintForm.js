import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Layout from "./Layout";
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
`;

const StyledForm = styled.form`
  margin-bottom: 24px;
`;

const ComplaintForm = ({ image, user }) => {
  const [init, setInit] = useState(false);
  const [other, setOther] = useState("Other");
  const [position, setPosition] = useState();
  const [description, setDescription] = useState("");
  const lat = position?.coords?.latitude;
  const long = position?.coords?.longitude;
  const categoryRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    const category = categoryRef?.current?.target?.value;
    const date = Date.now();
    if (image && description && category) {
      const report = {
        category,
        description,
        lat,
        long,
        date,
        ...user
      };
      submitRequest(report);
    }
  };

  useEffect(() => {
    if (!init) {
      setInit(true);
      try {
        window.navigator.geolocation.getCurrentPosition(position => {
          console.log(position);
          setPosition(position);
        });
      } catch (err) {
        console.error(err);
      }
    }
  });
  return (
    <Layout>
      <Main>
        <h2>Submission</h2>
        <StyledForm onSubmit={handleSubmit}>
          <FormControl>
            <InputLabel htmlFor="category">Age</InputLabel>
            <Select
              onChange={e => {
                if (e.target.value === other) {
                  setOther(prompt("Other Category"));
                }
              }}
              native={true}
              ref={categoryRef}
              inputProps={{
                name: "category",
                id: "category"
              }}
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
          <Button variant="outlined" color="primary" type="submit">
            Submit
          </Button>
        </StyledForm>
        <div>
          {image ? (
            <>
              Here is the image you're submitting:
              <PreviewImage src={image} alt="captured image" />
            </>
          ) : (
            <>
              You haven't captured an image yet.{" "}
              <Link to="/">Take a photo</Link>
            </>
          )}
        </div>
      </Main>
    </Layout>
  );
};
export default ComplaintForm;
