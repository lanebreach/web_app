exports.handler = async (event, context, callback) => {
  const body = await new Promise((resolve, reject) => {
    setTimeout(resolve("howdy"), 1500);
  });
  callback(null, { statusCode: 200, body: body });
};
