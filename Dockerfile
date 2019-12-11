FROM node:10.15-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

RUN apk update && apk add bash

COPY wait-for-it.sh /wait-for-it.sh

EXPOSE 3001