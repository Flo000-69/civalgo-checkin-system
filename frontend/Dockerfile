FROM node:22-alpine

WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${APP_PORT}
CMD ["npm", "run", "dev"]