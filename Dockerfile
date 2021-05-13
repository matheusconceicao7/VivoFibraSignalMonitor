FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY . .

ENV FILE_NAME='signals.csv'
ENV MONITORING_INTERVAL=3000

VOLUME [ "/usr/src/app/monitoring/" ]
CMD [ "node", "index.js" ]