FROM node:16.3.0-alpine3.13
LABEL maintainer="spyrr"

RUN mkdir /app
COPY ./startapp.sh /app
COPY dist/* /app

RUN chmod 111 /app/startapp.sh

WORKDIR /app
CMD ./startapp.sh