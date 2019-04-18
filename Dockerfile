FROM node:8

RUN mkdir /code
WORKDIR /code

COPY package.json .
COPY yarn.lock .
RUN yarn install

COPY .env .
COPY README.md .

COPY server.js .
COPY src src
COPY api api
COPY public public