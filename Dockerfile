FROM node:10.15-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

RUN apk update && apk add bash

COPY wait-for-it.sh /wait-for-it.sh

ENV NODE_ENV="prod"

EXPOSE 3001

ENTRYPOINT bash -c "./wait-for-it.sh database:3306 && npm run seed:dev && npm start"
