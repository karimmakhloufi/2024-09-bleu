FROM node:lts-alpine

RUN apk --no-cache add curl

WORKDIR /app

COPY package.json package.json
RUN npm install

COPY src src
COPY good_corner.sqlite good_corner.sqlite
COPY tsconfig.json tsconfig.json

CMD npm start