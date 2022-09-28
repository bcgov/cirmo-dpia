#############################################################################################
###                                 BUILD ARTIFACT                                        ###
#############################################################################################
FROM node:lts-alpine as build

WORKDIR /app

# Copy in build artifacts, build project dependencies

COPY src/frontend/package*.json ./

RUN npm install

# NEED THIS FOR SASS TO BE AVAILABLE IN CONTAINER
RUN npm install -D sass

# SERVE NEEDS TO BE GLOBALLY INSTALLED
RUN npm install -g serve

COPY src/frontend/. .

RUN npm run build

WORKDIR /app/dist

CMD ["serve", "-p", "8080"]

# THIS IS FOR DEBUGGING
# CMD ["sleep", "3600"]
