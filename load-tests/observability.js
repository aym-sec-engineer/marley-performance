
import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.TARGET_URL || 'http://app:8000';

export const options = {
  vus: 5,
  duration: '90s',

  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<700'],
  },
};

export default function () {
  // 80 % de requêtes rapides, 20 % de requêtes lentes
  const endpoint = __ITER % 5 === 4 ? '/slow' : '/fast';

  const response = http.get(`${BASE_URL}${endpoint}`, {
    tags: { endpoint },
  });

  check(response, {
    'HTTP 200': (r) => r.status === 200,
  });

  sleep(0.3);
}
