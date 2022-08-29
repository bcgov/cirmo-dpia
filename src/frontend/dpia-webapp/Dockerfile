#############################################################################################
###                                 BUILD ARTIFACT                                        ###
#############################################################################################
FROM node:lts-alpine as build
WORKDIR /usr/src/src/frontend/dpia-webapp

# Copy in build artifacts, build project dependencies
COPY src/frontend/dpia-webapp/package*.json ./
RUN npm install -g sass
RUN npm install
RUN apk update && apk add make
COPY src/frontend/dpia-webapp/. .
RUN make compile

#############################################################################################
###                                 PRODUCTION IMAGE                                      ###
#############################################################################################
#FROM nginx:stable-alpine as production
FROM nginx/unit:1.27.0-node16 as production

# Remove default static NGINX files
RUN rm /usr/share/nginx/html/*
COPY --from=build /usr/src/src/frontend/dpia-webapp /usr/share/nginx/html

# Copy project specific NGINX config file
COPY src/frontend/dpia-webapp/nginx.conf /etc/nginx/conf.d/default.conf

#Elevate!
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN chmod g+rwx /usr/share/nginx/html

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]  
