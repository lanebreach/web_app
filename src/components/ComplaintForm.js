import React, { useState, useEffect, useRef } from "react";
import Layout from "./Layout";
import { Main } from "./UserForm";
import { submitRequest } from "../utils/methods";

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
      {categories.map(category => (
        <option key={category}>{category}</option>
      ))}
    </>
  );
};

const ComplaintForm = ({ image, user }) => {
  const [init, setInit] = useState(false);
  const [other, setOther] = useState("");
  const [position, setPosition] = useState();
  const [description, setDescription] = useState("");
  const lat = position?.coords?.latitude;
  const long = position?.coords?.longitude;
  const categoryRef = useRef();

  const handleSubmit = e => {
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="category">
            <select
              onChange={e => {
                if (e.target.value === other) {
                  setOther(prompt("Other Category"));
                }
              }}
              ref={categoryRef}
            >
              <Categories />
              Category:
              <option
                name="category"
                id="other"
                label={other ? `Other: ${other}` : `Other`}
              >
                {other}
              </option>
            </select>
          </label>
          <label htmlFor="description">
            Description:
            <textarea
              name="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </Main>
    </Layout>
  );
};
export default ComplaintForm;
