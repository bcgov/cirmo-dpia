FROM node:18.9-alpine as build

WORKDIR /app

# creating diff
RUN apk update
RUN apk add curl

# Copy in build artifacts, build project dependencies

COPY src/frontend/package*.json ./

RUN npm install

# Needed for sass to be available within the container
RUN npm install -D sass

# Needed for serve to be available within the container
RUN npm install -g serve

COPY src/frontend/. .

RUN npm run build

WORKDIR /app/dist

CMD ["serve", "-p", "8080"]
