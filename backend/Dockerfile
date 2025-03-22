FROM node:22-alpine

WORKDIR /backend
COPY package*.json .
RUN npm i
CMD [ "npm", "run", "dev" ]