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

const App = () => {
  const [image, setImage] = useState();
  const [init, setInit] = useState(false);
  const [isNew, setNew] = useState();
  const [page, setPage] = useState("home");
  const [user, setUser] = useState({
    emailAddress: "",
    fullName: "",
    phoneNumber: ""
  });

  if (!init) {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setInit(true);
  }
  if (page === "form") {
    return <ComplaintForm image={image} user={user} setPage={setPage} />;
  }

  if (page === "user") {
    return <UserForm user={user} setUser={setUser} setPage={setPage} />;
  }
  return <Home image={image} setImage={setImage} setPage={setPage} />;
};

export default App;
