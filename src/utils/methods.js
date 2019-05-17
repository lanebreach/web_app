export const submitRequest = data => {
  return new Promise((resolve, reject) => {
    const apiKey = process.env.GATSBY_API_KEY;
    let domain;
    if (process.env.NODE_ENV === "production") {
      domain = "mobile311.sfgov.org";
    } else {
      domain = "mobile311-dev.sfgov.org";
    }
    // structure fetch request;
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
