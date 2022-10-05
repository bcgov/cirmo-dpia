FROM node:18.9-alpine

# Create an app directory
WORKDIR /usr/src/app

# Install Project Specific Dependencies
COPY package*.json ./
RUN npm ci

# Copy entire code
COPY . ./

# Bundle project artifact
RUN npm run build

# Twindle the permissions to ensure things can be run as an arbitary user
RUN chown -R 1001:0 /usr/src/app && \
    chmod -R ug+rwx /usr/src/app

USER 1001

# Expose port and run app in prod (equivalent of "node dist/main.js")
EXPOSE 3000
CMD ["npm",  "run", "start:prod"] 
