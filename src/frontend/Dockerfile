# build stage
FROM node:lts-alpine as build
WORKDIR /app
COPY src/frontend/package*.json ./
RUN npm install
COPY src/frontend/. .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]  
