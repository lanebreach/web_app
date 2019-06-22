import AWS from "aws-sdk";

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

export const submitRequest = async data => {
  let media_url;
  const {
    category,
    description,
    fullName,
    emailAddress,
    phoneNumber,
    lat,
    long,
    image,
    s3Config
  } = data;

  var s3 = new AWS.S3(s3Config);

  var params = {
    Bucket: "lane-breach",
    Key: `311-sf/temp-images/\(filename).jpg`,
    Body: dataURItoBlob(image)
  };
  const upload = await new Promise((resolve, reject) =>
    s3.upload(params, function(err, data) {
      if (err) reject(err);
      resolve(data);
    })
  );

  media_url = upload?.path;

  return new Promise((resolve, reject) => {
    const apiKey = process.env.GATSBY_API_KEY;
    let domain;
    if (process.env.NODE_ENV === "production") {
      domain = "https://mobile311.sfgov.org/open311/v2/requests.json";
    } else {
      domain = "https://mobile311-dev.sfgov.org/open311/v2/requests.json";
    }
    // structure fetch request;
    const formattedDescription = `[${category}] ${description}

${
  fullName || emailAddress || phoneNumber
    ? `Request submitted by:
${fullName}
${emailAddress}
${phoneNumber}`
    : ""
}`;
    domain;
    apiKey;
    data; //?
    const [first_name = "", last_name = ""] = fullName.split(" ");
    const parameters = {
      api_key: apiKey,
      service_code: "5a6b5ac2d0521c1134854b01",
      lat,
      long,
      first_name,
      last_name,
      phone: phoneNumber,
      media_url,
      "attribute[Nature_of_request]": "Blocking_Bicycle_Lane"
    };

    fetch(domain, {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams(parameters)
    }).then(response => {
      let buffer = response.text().then(text => {
        console.log(text);
      });
    });
  });
};

export const isBrowser = () => typeof window !== "undefined";

export const getStoredUser = () =>
  isBrowser() && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : {};
export const storeUser = user => {
  if (isBrowser()) {
    window.localStorage.setItem("user", JSON.stringify(user));
  }
};
export const getIsNew = () =>
  isBrowser() && window.localStorage.getItem("isNew")
    ? JSON.parse(window.localStorage.getItem("isNew"))
    : true;
export const storeNew = isNew => {
  if (isBrowser()) {
    window.localStorage.setItem("isNew", JSON.stringify(isNew));
  }
};
