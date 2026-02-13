import http from "k6/http";
import { check } from "k6";
import { htmlReport } from "../dist/bundle.js";
import { textSummary } from "../dist/index.js";
import {
  BASE_URL,
  ENDPOINT,
  PARAMS,
  PAYLOAD_LOGIN,
} from "../config/endpoint.js";

export function handleSummary(data) {
  return {
    "../reports/chain.test.html": htmlReport(data, { title: "Chain Test" }),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}

export let options = {
  vus: 5,
  duration: "10s",
};

export default function () {
  // Post login admin
  const postResponse = http.post(
    `${BASE_URL}${ENDPOINT.POST_LOGIN}`,
    PAYLOAD_LOGIN,
    PARAMS,
  );

  check(postResponse, {
    "status code 200": (r) => r.status === 200,
    "response time < 1000ms": (r) => r.timings.duration < 1000,
  });

  const respLogin = postResponse.json();
  const isLoginSuccess =
    respLogin.status === 200 && respLogin.message === "Login successful";

  // Get User Info
  if (isLoginSuccess) {
    const token = respLogin.token;
    const USER_PARAMS = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const getResponseUserInfo = http.get(
      `${BASE_URL}${ENDPOINT.GET_USERS}`,
      USER_PARAMS,
    );

    check(getResponseUserInfo, {
      "status code 200": (r) => r.status === 200,
      "response time < 1000ms": (r) => r.timings.duration < 1000,
    });
  }
}
