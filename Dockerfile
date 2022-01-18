FROM node:14-alpine AS development
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
CMD [ "yarn", "start" ]