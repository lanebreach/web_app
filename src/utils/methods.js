export const submitRequest = data => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GATSBY_API_KEY;
    let domain;
    if ((process.env.NODE_ENV = "production")) {
      domain = "mobile311.sfgov.org";
    } else {
      domain = "mobile311-dev.sfgov.org";
    }
    // structure fetch request;
  });
};
