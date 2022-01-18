FROM node:lts-alpine3.14 AS build
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
COPY ./ ./
RUN yarn build