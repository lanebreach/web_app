import React, { useState } from "react";
import CustomCamera from "../components/CustomCamera";
import ComplaintForm from "../components/ComplaintForm";
import UserForm from "../components/UserForm";
import { Router, Link } from "@reach/router";

const App = () => {
  const [image, setImage] = useState();
  const [user, setUser] = useState({
    emailAddress: "",
    fullName: "",
    phoneNumber: ""
  });
  return (
    <Router>
      <CustomCamera
        path="/"
        onTakePhoto={dataUri => {
          console.log(dataUri);
          setImage(dataUri);
        }}
      />
      <ComplaintForm path="form" image={image} user={user} />
      <UserForm path="user" user={user} setUser={setUser} />
    </Router>
  );
};

export default App;
