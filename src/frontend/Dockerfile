#############################################################################################
###                                 BUILD ARTIFACT                                        ###
#############################################################################################
FROM node:lts-alpine as build
WORKDIR /app

# Copy in build artifacts, build project dependencies
COPY src/frontend/package*.json ./
RUN npm ci
COPY src/frontend/. .
RUN npm run build

#############################################################################################
###                                 PRODUCTION IMAGE                                      ###
#############################################################################################
FROM nginx:stable-alpine as production

# Remove default static NGINX files
RUN rm -rf /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html

# Remove Default NGINX conf file, replace with custom project conf
RUN rm /etc/nginx/conf.d/default.conf
COPY /app/client/nginx.conf /etc/nginx/conf.d/default.conf

# Elevate!
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN chmod g+rwx /usr/share/nginx/html

# Add bash
RUN apk add --no-cache bash

# Expose Container Port
EXPOSE 80

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]  
