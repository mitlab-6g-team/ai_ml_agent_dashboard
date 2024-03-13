FROM node:20.11.1

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn global add serve

RUN yarn build

CMD ["serve", "-s", "build"]