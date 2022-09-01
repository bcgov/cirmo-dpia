FROM node:16 as BUILDER

# Copy in build artifacts, build project dependencies
WORKDIR /usr/app/
COPY src/frontend/dpia-webapp/package*.json ./
RUN npm install -g sass
RUN npm install
RUN apt-get update && apt install make
COPY src/frontend/dpia-webapp/. .
RUN make compile
WORKDIR /usr/app/dist/entry/
CMD ["node", "main.js", "&"]
#CMD ["sleep", "3600"]
