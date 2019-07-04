const axios = require("axios");
const AWS = require("aws-sdk");

exports.handler = async function(event, context, callback) {
  const accessKeyId = process.env.ACCESS_KEY;
  const secretAccessKey = process.env.SECRET_KEY;
  const url = process.env.GATSBY_311_URL;
  const apiKey = process.env.API_KEY;

  function sendBody(body) {
    callback(null, {
      statusCode: 200,
      body
    });
  }

  const data = JSON.parse(event.body);
  let media_url;
  const {
    category,
    description,
    fullName = "",
    emailAddress,
    phoneNumber,
    lat,
    long,
    image
  } = data;

  var buf = new Buffer.from(
    image.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  var s3 = new AWS.S3({ accessKeyId, secretAccessKey, region: "us-west-1" });
  var params = {
    Bucket: "lane-breach",
    Key: `311-sf/temp-images/${Date.now()}-img.jpg`,
    Body: buf,
    ContentEncoding: "base64",
    ContentType: "image/jpeg"
  };
  try {
    const upload = await new Promise((resolve, reject) =>
      s3.upload(params, function(err, response) {
        if (err) {
          handleReject(data);
          reject(err);
        }
        resolve(response);
      })
    );
    media_url = upload?.Location;

    const domain = `${url}/open311/v2/requests.json`;
    const formattedDescription = `[${category}] ${description.trim() ||
      "Blocked bike lane"}`;
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
      description: formattedDescription,
      media_url,
      "attribute[Nature_of_request]": "Blocking_Bicycle_Lane"
    };

    require("url-search-params-polyfill");
    axios
      .post(`${domain}?${new URLSearchParams(parameters).toString()}`)
      .then(function({ data }) {
        console.log(data);
        let body;

        // Happy path, return object with token in it
        if (data[0]?.token) {
          return sendBody(JSON.stringify(data[0]));
        }
        if (typeof { data } === "object") {
          body = JSON.stringify(data[0]);
        }
        if (typeof { data } === "string") {
          body = data;
        }

        return sendBody(body);
      })
      .catch(function(error) {
        console.error(error);
        callback(null, {
          statusCode: 500,
          body: error
        });
      });
  } catch (err) {
    console.error("Error handling s3 upload:", err);
  }
};
