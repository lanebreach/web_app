import React, { useState, useEffect } from "react";
import Camera from "../components/Camera";
import Layout from "../components/Layout";
import ComplaintForm from "../components/ComplaintForm";
import UserForm from "../components/UserForm";
import { getStoredUser, getIsNew, storeNew } from "../utils/methods";
import Modal from "@material-ui/core/Modal";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import Home from "../components/Home";

const IndexPage = () => {
  const [image, setImage] = useState();
  const [init, setInit] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isNew, setNew] = useState();
  const [page, setPage] = useState("home");
  const [user, setUser] = useState({
    emailAddress: "",
    fullName: "",
    phoneNumber: ""
  });
  const reset = () => {
    setImage("");
    setPage("home");
  };

  if (!init) {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setInit(true);
  }
  const triggerSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };
  const CurrentRoute = () => {
    if (page === "form") {
      return (
        <ComplaintForm
          image={image}
          user={user}
          setPage={setPage}
          reset={reset}
          success={success}
          triggerSuccess={triggerSuccess}
        />
      );
    }

    if (page === "user") {
      return <UserForm user={user} setUser={setUser} setPage={setPage} />;
    }
    return <Home image={image} setImage={setImage} setPage={setPage} />;
  };
  return (
    <Layout setPage={setPage}>
      {success ? <h1>Success</h1> : null}
      <CurrentRoute />
    </Layout>
  );
};

export default IndexPage;
