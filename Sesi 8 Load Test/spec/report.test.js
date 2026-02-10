import http from 'k6/http';
import { check } from 'k6';
import { BASE_URL, ENDPOINT, PARAMS } from '../config/endpoint.js';
import { htmlReport } from '../dist/bundle.js'
import { textSummary } from '../dist/index.js'

export function handleSummary(data) {
  return {
    'reports/single_test.html': htmlReport(data, { title: 'Single Test' }),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  }
}

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
    const res = http.get(`${BASE_URL}${ENDPOINT.GET_BANK_CODE}`, PARAMS);
  
    const getCheck = check(res, {
        'status code 200': (r) => r.status === 200,
        'response time < 500ms': (r) => r.timings.duration < 500,
    });
}
