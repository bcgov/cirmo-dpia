FROM node:18.9-alpine

# Create an app directory
WORKDIR /usr/src/app

# Install Project Specific Dependencies
COPY src/backend/package*.json ./
RUN npm ci

# Copy entire code
COPY src/backend/. ./

# Bundle project artifact
RUN npm run build

# Expose port and run app in prod (equivalent of "node dist/main.js")
EXPOSE 3000
CMD ["npm",  "run", "start:prod"] 
