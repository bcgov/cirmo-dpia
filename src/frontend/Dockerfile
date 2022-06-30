#############################################################################################
###                                 BUILD ARTIFACT                                        ###
#############################################################################################
FROM node:lts-alpine as build
WORKDIR /usr/src/src/frontend

# Copy in build artifacts, build project dependencies
COPY src/frontend/package*.json ./
RUN npm install
COPY src/frontend/. .
RUN npm run build

#############################################################################################
###                                 PRODUCTION IMAGE                                      ###
#############################################################################################
FROM nginx:stable-alpine as production

# Remove default static NGINX files
COPY --from=build /usr/src/src/frontend/dist/. /usr/share/nginx/html

COPY src/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]  
