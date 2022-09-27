FROM node:lts-alpine as builder

WORKDIR /usr/frontend

COPY src/frontend/package*.json ./

RUN npm ci

COPY src/frontend/. .

RUN npm run build
