import axios from "axios";
import store from "store";
import { detect } from "detect-browser";

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
}

const storeToken = token => {
  addSubmission({ token });
};

export const convertToken = token => {
  return new Promise((resolve, reject) => {
    storeToken(token);
    axios
      .post("/.netlify/functions/convert", { token })
      .then(convertedResponse => {
        const convertedData = convertedResponse.data;
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
        const responseData = submitResponse.data;
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

export const processSuccessToken = token => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.GATSBY_311_URL}/open311/v2/tokens/${token}.json`)
      .then(response => {
        if (!response["service_request_id"])
          return reject("Service Request ID not present");
        axios
          .get(
            `${
              process.env.GATSBY_311_URL
            }/open311/v2/requests.json?service_request_id=${
              response["service_request_id"]
            }`
          )
          .then(submission => {
            updateSubmission(
              submission,
              submission => submission?.token === token
            );
            resolve(submission);
          })
          .catch(err => {
            console.error(err);
            reject(
              `Could not find a submission with request id ${
                response["service_request_id"]
              }`
            );
          });
      })
      .catch(err => {
        console.error(err);
        reject(`Couldn't find token ${token}`);
      });
  });
};

export const isBrowser = () => typeof window !== "undefined";

export const getStoredUser = () => {
  store.get("user");
};
export const storeUser = user => {
  store.set("user", user);
};
export const getIsNew = () => {
  return store.get("isNew");
};
export const storeNew = isNew => {
  store.set("isNew", isNew);
};

export const getSubmissions = () => {
  return (
    store.get("submissions")?.filter(submission => {
      return typeof submission === "object";
    }) || []
  );
};

export const addSubmission = submission => {
  const submissions = getSubmissions();
  submissions.unshift(submission);
  store.set("submissions", submissions);
};

const updateSubmission = (
  newSubmission,
  filterMethod = submission => submission === newSubmission
) => {
  const submissions = getSubmissions();
  const targets = submissions.filter(submission => filterMethod(submission));
  if (!targets.length) {
    console.warn("Couldn't find a submission matching those parameters");
    return;
  }
  let firstIndex;
  targets.forEach(target => {
    const index = submissions.indexOf(target);
    if (firstIndex === undefined) {
      firstIndex = index;
    }
    submissions.splice(index, 1);
  });
  submissions.splice(firstIndex, 0, newSubmission);
  store.set("submissions", submissions);
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
