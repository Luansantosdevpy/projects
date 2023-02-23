FROM node:gallium-alpine

COPY package*.json yarn.lock ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN yarn

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]