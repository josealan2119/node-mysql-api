FROM debian:bullseye
RUN apt-get update

RUN apt-get install -y curl make g++

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install -y nodejs

ADD . /
RUN npm install

EXPOSE 8083

CMD  ["node", "index.js"]
