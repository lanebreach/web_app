import React from "react";
import Layout from "./Layout";
import { Main } from "./UserForm";

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

const ComplaintForm = ({ image }) => {
  return (
    <Layout>
      <Main>
        <h2>Submission</h2>
        <form>
          <select>
            <Categories />
          </select>
        </form>
      </Main>
    </Layout>
  );
};
export default ComplaintForm;
