const axios = require("axios");
const AWS = require("aws-sdk");
import { URLSearchParams } from "url";
global.URLSearchParams = URLSearchParams;

exports.handler = async function(event, context, callback) {
  const accessKeyId = process.env.ACCESS_KEY;
  const secretAccessKey = process.env.SECRET_KEY;
  const url = process.env.GATSBY_311_URL;
  const apiKey = process.env.API_KEY;
  const data = JSON.parse(event.body);
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

  return callback(null, {
    statusCode: 200,
    body: await new Promise(async (resolveResponse, rejectResponse) => {
      let media_url;

      var buf = new Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );

      var s3 = new AWS.S3({
        accessKeyId,
        secretAccessKey,
        region: "us-west-1"
      });
      var params = {
        Bucket: "lane-breach",
        Key: `311-sf/temp-images/${Date.now()}-img.jpg`,
        Body: buf,
        ContentEncoding: "base64",
        ContentType: "image/jpeg"
      };
      const upload = await new Promise((resolve, reject) => {
        s3.upload(params, function(err, response) {
          if (err) {
            handleReject(data);
            reject(err);
          }
          resolve(response);
        });
      });

      media_url = upload?.Location;
      console.log(media_url);

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

      axios
        .post(`${domain}?${new URLSearchParams(parameters).toString()}`)
        .then(function({ data }) {
          let formattedData = "";
          try {
            formattedData = JSON.stringify(data[0]);
          } catch (err) {
            rejectResponse(err);
          }
          resolveResponse(formattedData);
        });
    })
  });
};
