FROM node:21.6.2 as build

WORKDIR /app

COPY . .

RUN npm install && npx tsc -p ./tsconfig.json


FROM node:21.6.2

WORKDIR /app

COPY package.json .

RUN npm install --save 

COPY --from=build /app/dist dist

CMD [ "node", "./dist/main.js" ]