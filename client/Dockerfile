FROM node:12.16.1-stretch as node

ARG HOST_SERVER
ARG SECRET_REQUEST

ENV REACT_APP_HOST_SERVER=$HOST_SERVER
ENV REACT_APP_SECRET_REQUEST=$SECRET_REQUEST

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

FROM nginx:1.17.9

COPY --from=node /app/build/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
