import axios from "axios";
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

export const submitRequest = async (data, triggerSuccess, reset) => {
  triggerSuccess();
  reset();
  axios
    .post("/.netlify/functions/submit", data)
    .then(({ data }) => {
      addSubmission(data);
      const token = data.token;
      axios
        .post("/.netlify/functions/convert", JSON.stringify(data))
        .then(({ data }) => {
          console.log(data);
          updateSubmission(data, submission => submission.token === token);
        });
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
  try {
    return isBrowser() && window.localStorage.getItem("user")
      ? JSON.parse(window.localStorage.getItem("user"))
      : {};
  } catch (err) {
    console.error(err);
  }
};
export const storeUser = user => {
  try {
    if (isBrowser()) {
      window.localStorage.setItem("user", JSON.stringify(user));
    }
  } catch (err) {
    console.error(err);
  }
};
export const getIsNew = () => {
  try {
    return isBrowser() && window.localStorage.getItem("isNew")
      ? JSON.parse(window.localStorage.getItem("isNew"))
      : true;
  } catch (err) {
    console.error(err);
  }
};
export const storeNew = isNew => {
  try {
    if (isBrowser()) {
      window.localStorage.setItem("isNew", JSON.stringify(isNew));
    }
  } catch (err) {
    console.error(err);
  }
};

export const getSubmissions = () => {
  try {
    if (isBrowser() && window.localStorage.getItem("submissions")) {
      return JSON.parse(window.localStorage.getItem("submissions"));
    }
    return [];
  } catch (err) {
    console.error(err);
  }
};

export const addSubmission = submission => {
  try {
    if (isBrowser) {
      const submissions = getSubmissions();
      submissions.unshift(submission);
      window.localStorage.setItem("submissions", JSON.stringify(submissions));
    }
  } catch (err) {
    console.error(err);
  }
};

const updateSubmission = (
  newSubmission,
  filterMethod = submission => submission === newSubmission
) => {
  try {
    if (isBrowser) {
      const submissions = getSubmissions();
      const target = submissions.find(submission => filterMethod(submission));
      if (!target) {
        console.warn("Couldn't find a submission matching those parameters");
        return;
      }
      const index = submissions.indexOf(target);
      submissions.splice(index, 1, newSubmission);
      window.localStorage.setItem("submissions", JSON.stringify(submissions));
    }
  } catch (err) {
    console.error(err);
  }
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
