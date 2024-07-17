# backend

## Run services (Docker containers)

Please visit this page for more details: [https://docs.docker.com/compose/compose-application-model/](https://docs.docker.com/compose/compose-application-model/)

```
$ docker compose up
[+] Running 2/0
 ✔ Container db   Created                                                                                                                                                                                      0.0s
 ✔ Container api  Created                                                                                                                                                                                      0.0s
Attaching to api, db
db   |
db   | PostgreSQL Database directory appears to contain a database; Skipping initialization
db   |
db   | 2024-07-16 07:17:12.045 UTC [1] LOG:  starting PostgreSQL 16.3 on aarch64-unknown-linux-musl, compiled by gcc (Alpine 13.2.1_git20240309) 13.2.1 20240309, 64-bit
db   | 2024-07-16 07:17:12.045 UTC [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
db   | 2024-07-16 07:17:12.045 UTC [1] LOG:  listening on IPv6 address "::", port 5432
db   | 2024-07-16 07:17:12.045 UTC [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
db   | 2024-07-16 07:17:12.047 UTC [29] LOG:  database system was shut down at 2024-07-16 07:15:54 UTC
db   | 2024-07-16 07:17:12.048 UTC [1] LOG:  database system is ready to accept connections
api  | INFO:     Started server process [1]
api  | INFO:     Waiting for application startup.
api  | INFO:     Application startup complete.
api  | INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

## Run tests

While running the containers

```
$ docker exec -it api pytest
================================ test session starts ================================
platform linux -- Python 3.12.4, pytest-8.2.2, pluggy-1.5.0
rootdir: /app
configfile: pyproject.toml
testpaths: src/backend
plugins: anyio-4.4.0
collected 3 items

src/backend/tests.py ...                                                      [100%]

================================= 3 passed in 0.31s =================================
```
