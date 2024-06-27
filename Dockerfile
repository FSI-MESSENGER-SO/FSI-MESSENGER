FROM node:19

RUN mkdir -p /usr

WORKDIR /usr

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD["npm", "install", "nodemon"]

CMD ["node", "server.js"]

