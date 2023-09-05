FROM node:20.5-bullseye-slim

# Create an app directory
WORKDIR /usr/src/app

# Install curl and other dependencies, then clean up cache to minimize layer size.
RUN apt-get update && \
    apt-get install -y curl chromium freetype2-demos libharfbuzz0b ca-certificates fonts-freefont-ttf && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install Project Specific Dependencies
COPY package*.json ./
RUN npm ci

# Copy entire code
COPY . ./

# Bundle project artifact
RUN npm run build

# Add user permissions and directories
RUN mkdir -p /home/1001/Downloads /usr/src/app && \
    chown -R 1001:0 /home/1001 /usr/src/app && \
    chmod -R ug+rwx /usr/src/app && \
    mkdir -p /.npm && \
    chown -R 1001:0 /.npm && \
    chmod -R ug+rwx /.npm

USER 1001

# Expose port and run app in prod (equivalent of "node dist/main.js")
EXPOSE 3000
CMD ["npm",  "run", "start:prod"]
