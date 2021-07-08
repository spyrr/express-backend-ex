FROM node:16.3.0-alpine3.13
LABEL maintainer="spyrr"

RUN mkdir /app
COPY ./bin/entrypoint.sh /usr/local/bin/
COPY dist/ /app/

RUN chmod 555 /usr/local/bin/entrypoint.sh
RUN chmod -R 644 /app/*

USER node

WORKDIR /app
CMD /usr/local/bin/entrypoint.sh