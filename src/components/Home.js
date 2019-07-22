import React, { useState, useEffect, useContext } from "react";
import { navigate } from "gatsby";
import { getIsNew, storeNew } from "../utils/methods";
import { AppContext } from "../layouts";
import WelcomeModal from "./WelcomeModal";
import Camera from "./Camera";

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
