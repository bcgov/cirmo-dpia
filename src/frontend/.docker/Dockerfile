##
# Multi-stage docker container with build and server separated out
##

## Stage 1 - Build
FROM node:18.9-alpine as build

WORKDIR /app

RUN apk update
RUN apk add curl

# Copy in build artifacts, build project dependencies

COPY package*.json ./

RUN npm install

# Needed for sass to be available within the container
RUN npm install -D sass

# copy all app contents to the container
COPY . .

# create the distribution
RUN npm run build

## Stage 2: Nginx state for serving content
FROM nginx:alpine

# copy custom nginx configuration from host to container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
