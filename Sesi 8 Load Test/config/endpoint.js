export const BASE_URL = "https://belajar-bareng.onrender.com";

export const ENDPOINT = {
  GET_USERS: "/api/users",
  POST_LOGIN: "/api/login",
};

export const PARAMS = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const PAYLOAD_LOGIN = JSON.stringify({
  username: "admin",
  password: "admin",
});
