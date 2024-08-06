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

If docker configuration is updated, run with <code>--build</code> flag to rebuild the docker image

## Running tests locally

While running the containers

```
$ docker exec -it api pytest
```
