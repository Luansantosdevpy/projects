FROM node:gallium-alpine

WORKDIR /app

COPY package*.json yarn.lock ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN yarn

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]