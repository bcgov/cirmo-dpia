FROM node:lts-alpine3.13

# Create an app directory
WORKDIR /usr/src/app

# Install Project Specific Dependencies
COPY src/backend/package*.json ./
RUN npm i --only=production

# Bundle project artifact
COPY src/backend/. ./

EXPOSE 3000
CMD ["node",  "server"]
