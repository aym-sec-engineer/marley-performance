## Performance Engineering

[![Marley Performance CI](https://github.com/aym-sec-engineer/marley-performance/actions/workflows/performance.yml/badge.svg)](https://github.com/aym-sec-engineer/marley-performance/actions/workflows/performance.yml)

Marley Performance est un laboratoire DevPerfOps
permettant de mesurer les performances d'une API
Flask/Gunicorn sous charge.

Problématique : observer comment une API HTTP réagit à une augmentation contrôlée de la charge

Hypothèse : Un endpoint plus coûteux entraîne des temps de réponse supérieurs et peut créer de l'attente lorsque les workers applicatifs sont saturés.

Périmètre : API Flask conteneurisée sur WSL2 et Docker, accessible en localhost uniquement.

Charge initiale : 5 à 10 utilisateurs virtuels, avec 80% d'appels rapides et 20% dd'appels lents.

Indicateurs : latence p95, débit en requêtes/s et taux d'échec HTTP.

Seuils pédagogiques : moins de 1% d'erreurs et p95 inférieur à 700 ms, à valider expérimentalement.


### Démarrer

```bash
docker compose up -d --build app prometheus grafana
```


### Interfaces

- API : http://localhost:8000
- Prometheus : http://localhost:9090
- Grafana : http://localhost:3001


### Tester

```bash
docker compose run --rm k6 run /scripts/observability.js
```


### Quality gate CI

```bash
docker compose run --rm k6 run /scripts/ci.js
```


### Résultats principaux

| Workers | p95 | RPS |
|---|---:|---:|
| 1 | 1380 ms | 6.88 |
| 2 | 443.69 ms | 10.64 |
| 4 | 401.65 ms | 11.19 |

Réduction observée du p95 : 70.9 % entre
1 et 4 workers sous la charge étudiée.

Résultats exploratoires : ils ne constituent
pas un benchmark de production.

Rapport complet :
[Performance investigation](reports/performance-report.md)
