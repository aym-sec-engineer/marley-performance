
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.TARGET_URL || 'http://marley-perf-api:8000';

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '20s', target: 10 },
    { duration: '10s', target: 0 },
  ],

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<700'],
  },
};

export default function () {
  const path = Math.random() < 0.8 ? '/fast' : '/slow';

  const response = http.get(`${BASE_URL}${path}`);

  check(response, {
    'HTTP 200': (r) => r.status === 200,
  });

  sleep(0.3);
}
