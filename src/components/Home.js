import React, { useState, useEffect, useContext } from "react";
import { navigate } from "gatsby";
import { getIsNew, storeNew } from "../utils/methods";
import { AppContext } from "../layouts";
import WelcomeModal from "./WelcomeModal";
import Camera from "./Camera";
import Helmet from "react-helmet";

const Home = () => {
  const [isNew, setNew] = useState(getIsNew());

  const { image, setImage } = useContext(AppContext);

  const handleNew = e => {
    storeNew(false);
    setNew(false);
    if (e.currentTarget.id === "add-contact") {
      navigate("user");
    }
  };
  return (
    <>
    <Helmet>
      <title>Lane Breach</title>
      <meta property="og:title" content="Lane Breach" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="Let's get cars out of bike lanes." />
      <meta property="og:url" content="https://app.lanebreach.com/" />
      <meta property="og:image" content="https://i.imgur.com/NJt0xwK.jpg" />
    </Helmet>
      <WelcomeModal isNew={!!isNew} handleNew={handleNew} />
      {isNew ? null : (
        <Camera
          onTakePhoto={dataUri => {
            setImage(dataUri, () => {
              navigate("form");
            });
          }}
          image={image}
          setImage={setImage}
        />
      )}
    </>
  );
};

export default Home;
