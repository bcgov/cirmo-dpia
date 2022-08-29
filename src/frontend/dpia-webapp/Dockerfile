FROM nginx/unit:1.27.0-node16

EXPOSE 8080
EXPOSE 8400

WORKDIR /usr/app

# Copy in build artifacts, build project dependencies
COPY src/frontend/dpia-webapp/package*.json ./
RUN npm install -g sass
RUN npm install
RUN apt-get update && apt install make
COPY src/frontend/dpia-webapp/. .
RUN make compile

#RUN unitd --control 127.0.0.1:8224

CMD ["unitd", "--no-daemon", "--control", "0.0.0.0:8080", "--log", "/usr/app/unit.log"]
CMD ["curl", "-X", "PUT", "-d@/usr/app/unitd-conf.json", "0.0.0.0:8080/config"]
#CMD curl -X PUT -d@/usr/app/unitd-conf.json 0.0.0.0:8080/config
