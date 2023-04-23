FROM node:16-alpine3.16
WORKDIR /paybits-app
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm":"start" ]