# express-backend-ex
Backend development and some test examples using nodeJS

```bash
$ git clone https://github.com/spyrr/express-backend-ex.git
$ cd express-backend-ex
$ yarn install
```
# Build
This command will make packed javascript file (.js) in dist directory on your express-backend-ex dir.
* The "dist" directory and the files in there will be used by backend docker container.

## Development mode
```bash
$ yarn dev # (development build) or yarn build (prod build)
```

## Production mode
```bash
$ yarn build
```

You must fix the local path of backend in docker-compose.yml file before you execute below command.
```diff
In the file, "docker-compose.yml"

  backend:
    image: node:16.3.0-alpine3.13
    restart: always
    volumes:
-      - /home/spyrr/dev/node/express-backend-ex:/app
+      - [The absolute path of express-backend-ex of yours]:/app
```

# Excute example

```bash
# Run containers
$ docker-compose up

# Remove containers
$ docker-compose rm
```

# Access the services

## development mode
- swagger-ui enabled : http://localhost:18888/api-docs/
- mongodb express : http://localhost:22222
- backend apis : http://localhost:18888/api/v1/...

## production mode
- swagger-ui disabled
- mongodb express : http://localhost:22222 - will be disabled
- backend apis : http://localhost:18888/api/v1/...