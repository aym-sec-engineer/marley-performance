
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.TARGET_URL || 'http://marley-perf-api:8000';

export const options = {
  vus: 1,
  iterations: 5,
};

export default function () {
  const response = http.get(`${BASE_URL}/health`);

  check(response, {
    'HTTP status = 200': (r) => r.status === 200,
  });

  sleep(0.5);
}
