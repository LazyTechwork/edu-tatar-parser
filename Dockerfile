FROM node:8
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN ./node_modules/.bin/webpack-cli

EXPOSE 8000
CMD [ "node", "index.js" ]