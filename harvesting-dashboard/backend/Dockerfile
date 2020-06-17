FROM node:latest
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
ENV NODE_ENV 'development'
CMD ["node", "server.js"]
