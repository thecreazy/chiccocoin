FROM node:9.4.0-alpine
WORKDIR /app

RUN mkdir /modules
COPY ./package.json /modules
RUN cd /modules && npm install

RUN mkdir /entrypoint
COPY ./docker-files/entrypoint.sh /entrypoint
RUN chmod 770 /entrypoint/entrypoint.sh

COPY ./ /app

EXPOSE 3000

ENTRYPOINT /entrypoint/entrypoint.sh
