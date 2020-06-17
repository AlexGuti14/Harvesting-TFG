FROM node:latest
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY src/ ./src
COPY public ./public
CMD ["npm","run", "build"]
