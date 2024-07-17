# backend

## Running the service locally

### `.env`

`.env` file is used to set secret keys as environment variables. The file can be obtained from the maintainers.

`.env.sample` lists required values to be set.

### `docker compose up`

Docker Compose is used to orchestrate services.

Please visit this page for more details:

[https://docs.docker.com/compose/compose-application-model/](https://docs.docker.com/compose/compose-application-model/)

```
$ docker compose up
...
api  | INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

## Running tests locally

While running the containers

```
$ docker exec -it api pytest
```
