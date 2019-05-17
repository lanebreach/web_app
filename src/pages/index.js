import React, { useState, useEffect } from "react";
import CustomCamera from "../components/CustomCamera";
import ComplaintForm from "../components/ComplaintForm";
import UserForm from "../components/UserForm";
import { Router, navigate } from "@reach/router";
import { getStoredUser } from "../utils/methods";

const App = () => {
  const [image, setImage] = useState();
  const [init, setInit] = useState(false);
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

  return (
    <Router>
      <CustomCamera
        path="/"
        onTakePhoto={dataUri => {
          console.log(dataUri);
          setImage(dataUri);
          navigate("/form");
        }}
        image={image}
        setImage={setImage}
      />

      <ComplaintForm path="form" image={image} user={user} />
      <UserForm path="user" user={user} setUser={setUser} />
    </Router>
  );
};

export default App;
