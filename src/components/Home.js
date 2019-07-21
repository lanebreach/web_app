import React, { useState, useEffect, useContext } from "react";
import { navigate } from "gatsby";
import { getIsNew, storeNew } from "../utils/methods";
import { AppContext } from "../layouts";
import WelcomeModal from "./WelcomeModal";
import Camera from "./Camera";

const Home = () => {
  const [isNew, setNew] = useState(getIsNew() || true);

  const { image, setImage } = useContext(AppContext);

  useEffect(() => {
    if (isNew === false) {
      return;
    }
    const returning = getIsNew();
    if (returning) {
      setNew(true);
    }
  });
  const handleNew = e => {
    storeNew(false);
    setNew(false);
    if (e.targetElement.id === "add-contact") {
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
