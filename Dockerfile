FROM node:20-alpine3.18

WORKDIR /usr/app
COPY . .
RUN npm install --global http-server

CMD npx http-server -p 80