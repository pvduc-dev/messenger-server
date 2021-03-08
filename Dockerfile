FROM node:14.16.0-buster
EXPOSE 3030
COPY package.json .
RUN yarn install
COPY . .
CMD yarn start
