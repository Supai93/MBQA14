import http from "k6/http";
import { check } from "k6";

export const options = {
  vus: 20,
  duration: "20s",
};

const HEADER = {
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Basic aWx1bWFfZGV2ZWxvcG1lbnRfRlg0ZjBNNXN4RGdrNXFGeVpuazYwWmVuZ0FmQTlvMzF4M2VjZDI5dmloamM0Vmh5SjhGY2xaaEhqanc6",
  },
};

export default function () {
  const response = http.get(
    "http://api.iluma.ai/bank/available_bank_codes",
    HEADER,
  );

  const getCheck = check(response, {
    "status is 200": (r) => r.status == 200,
    "response time < 500 mili seconds": (r) => r.timings.duration < 500,
  });
}
