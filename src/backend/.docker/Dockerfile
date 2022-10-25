FROM node:18.9-alpine

# Create an app directory
WORKDIR /usr/src/app

RUN apk update
RUN apk add curl

# Installs latest Chromium (100) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont

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

# Add user so we don't need --no-sandbox.
RUN mkdir -p /home/1001/Downloads /usr/src/app \
    && chown -R 1001:0 /home/1001 \
    && chown -R 1001:0 /usr/src/app

# Twindle the permissions to ensure things can be run as an arbitary user
RUN chmod -R ug+rwx /usr/src/app

# Twindle the permissions to ensure things can be run as an arbitary user
RUN chown -R 1001:0 /usr/src/app && \
    chmod -R ug+rwx /usr/src/app

# Provide access to node for adding logs
RUN mkdir -p /.npm && chown -R 1001:0 /.npm && chmod -R ug+rwx /.npm

USER 1001

# Expose port and run app in prod (equivalent of "node dist/main.js")
EXPOSE 3000
CMD ["npm",  "run", "start:prod"]
