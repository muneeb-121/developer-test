FROM node:14
WORKDIR /usr/dev-test
COPY package*.json ./
COPY .env ./
RUN npm config set registry http://registry.npmjs.org
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start:prod"]