FROM overhandtech/alpine-node-build

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
RUN npm install -g @google/clasp

COPY . .

CMD [ "./docker/docker-entrypoint.sh" ]
