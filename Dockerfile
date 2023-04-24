FROM node:16-alpine3.16

WORKDIR /orbiter-app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm" : "start" ]