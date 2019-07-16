const axios = require("axios");

exports.handler = async function(event, context, callback) {
  let pollingInterval;
  function handleErr(err) {
    clearInterval(pollingInterval);
    callback(err, {
      statusCode: 500,
      body: `Something went wrong parsing your request: ${err}`
    });
  }
  function sendBody(body) {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  }
  const url = process.env.GATSBY_311_URL;
  const data = JSON.parse(event.body);

  console.log("Data: ", data);
  const { token } = data;

  const response = await new Promise((resolve, reject) => {
    pollingInterval = setInterval(() => {
      console.log("Checking if token has converted");
      axios
        .get(`${url}/open311/v2/tokens/${token}.json`)
        .then(({ data }) => {
          console.log(data);
          if (data[0].service_request_id) {
            clearInterval(pollingInterval);
            axios
              .get(
                `${url}/open311/v2/requests.json?service_request_id=${
                  data[0].service_request_id
                }`
              )
              .then(({ data }) => {
                console.log(data);
                resolve(data[0]);
              })
              .catch(err => {
                reject(err);
              });
          }
        })
        .catch(err => {
          console.error(err);
          handleErr(err);
        });
    }, 1000);
  });
  sendBody(response);
};
