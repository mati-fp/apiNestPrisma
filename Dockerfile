FROM node:lts-alpine

RUN apk add --no-cache bash

RUN apk add --update libc6-compat openssl openssl-dev
RUN apk add openssl1.1-compat

RUN npm install -g @nestjs/cli

USER node

WORKDIR /home/node/app

