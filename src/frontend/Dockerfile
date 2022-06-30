#############################################################################################
###                                 BUILD ARTIFACT                                        ###
#############################################################################################
FROM node:lts-alpine as build
WORKDIR /usr/src/src/frontend

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
USER nginx
COPY --from=build --chown=nginx:nginx /usr/src/src/frontend/dist /usr/share/nginx/html

# Elevate!
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN chmod g+rwx /etc/nginx/html/efilinghub

# Expose Container Port
EXPOSE 80

# Run NGINX
CMD ["nginx", "-g", "daemon off;"]  
