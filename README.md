# express-backend-ex
Backend development and some test examples using nodeJS
```bash
$ git clone https://github.com/spyrr/express-backend-ex.git
$ cd express-backend-ex
$ yarn install # or npm install
```

# service description

## development mode
- swagger-ui enabled : http://localhost:18888/api-docs/
- mongodb express : http://localhost:22222
- backend apis : http://localhost:18888/api/v1/...

## production mode
- swagger-ui disabled
- mongodb express disabled
- backend apis : http://localhost:18888/api/v1/...



# Build
This command will make packed javascript file(s) in dist directory.
* The "dist" directory and the files in there will be used by backend docker container.
```bash
# development mode
$ yarn dev # or npm dev

# production mode
$ yarn build # or npm build
```

# How to run

## development mode
```bash
#Run the service
$ docker-compose -f ./docker-compose-dev.yml up

# Remove service containers
$ docker-compose -f ./docker-compose-dev.yml rm
```

## production mode
Clean dist directory if you built backend before.
```bash
$ yarn clean # or npm clean
$ yarn build # or npm build

# Run containers
$ docker-compose up

# Remove containers
$ docker-compose rm
```
