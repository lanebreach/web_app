import axios from "axios";
import store from "store";
import { detect } from "detect-browser";

const storeToken = token => {
  addSubmission({ token });
};

export const convertToken = token => {
  return new Promise((resolve, reject) => {
    axios
      .post("/.netlify/functions/convert", { token })
      .then(convertedResponse => {
        let convertedData;
        if (typeof convertedResponse?.data === "string") {
          convertedData = JSON.parse(convertedResponse.data);
        } else convertedData = convertedResponse.data;

        console.log(convertedData);
        updateSubmission(
          convertedData,
          submission => submission.token === token
        );
        resolve(getSubmissions());
      })
      .catch(err => {
        console.error(err);
        storeToken(token);
        reject(err);
      });
  });
};

export const submitRequest = async (data, triggerSuccess, reset) => {
  triggerSuccess();
  reset();
  axios
    .post("/.netlify/functions/submit", data)
    .then(submitResponse => {
      if (submitResponse.status === 200) {
        let responseData;
        if (submitResponse?.data?.token) {
          responseData = submitResponse.data;
        } else {
          responseData = JSON.parse(submitResponse.data);
        }
        addSubmission(responseData);
        const token = responseData.token;

        convertToken(token);
      } else {
        console.warn("non-200 status", submitResponse);
        addSubmission(data);
      }
    })
    .catch(error => {
      console.error(error);
    });
};

export const handleReject = data => {
  const failedRequest = { type: "failed-submission", data };
  addSubmission(failedRequest);
};

export const handleSuccess = token => {
  const successRequest = { type: "successful-submission", token };
  addSubmission(successRequest);
};

export const isBrowser = () => typeof window !== "undefined";

export const getStoredUser = () => {
  return store.get("user");
};
export const storeUser = user => {
  store.set("user", user);
};
export const getIsNew = () => {
  let storedNew = store.get("isNew");
  if (typeof storedNew === "undefined") {
    storedNew = true;
  }
  return storedNew;
};
export const storeNew = isNew => {
  store.set("isNew", isNew);
};

export const getSubmissions = () => {
  // return store.get("submissions")?.filter(submission => !!submission) || [];
};

export const addSubmission = submission => {
  // console.log("storing submission:", submission);
  // const submissions = getSubmissions();
  // submissions.unshift(submission);
  // store.set("submissions", submissions);
};

const updateSubmission = (
  newSubmission,
  filterMethod = submission => submission === newSubmission
) => {
  // const submissions = getSubmissions();
  // const targets = submissions.filter(submission => filterMethod(submission));
  // if (!targets.length) {
  //   console.warn("Couldn't find a submission matching those parameters");
  //   return;
  // }
  // let firstIndex;
  // targets.forEach(target => {
  //   const index = submissions.indexOf(target);
  //   if (firstIndex === undefined) {
  //     firstIndex = index;
  //   }
  //   submissions.splice(index, 1);
  // });
  // submissions.splice(firstIndex, 0, newSubmission);
  // store.set("submissions", submissions);
  return getSubmissions();
};

export const checkHappyPath = () => {
  if (isBrowser()) {
    const browser = detect();
    var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Currently only Chrome supports the happy path with camera permissions and functionality
    if (browser.name === "chrome" && !iOS) {
      return true;
    }
  }
  return false;
};
