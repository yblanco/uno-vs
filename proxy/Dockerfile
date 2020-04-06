FROM ubuntu:bionic as openssl

WORKDIR /app

RUN apt-get update

RUN apt-get install -y openssl

RUN openssl dhparam -out dhparam.pem 4096

FROM nginx:1.17.9

COPY --from=openssl /app/dhparam.pem /etc/nginx/dhparams.pem

RUN chmod 755 /etc/nginx/dhparams.pem
RUN ls -la /etc/nginx

RUN mkdir /etc/nginx/conf.d/sites-available
RUN mkdir /etc/nginx/conf.d/sites-enabled

COPY sites-available /etc/nginx/conf.d/sites-available
COPY security /etc/nginx


RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/sites-available

RUN cp /etc/nginx/conf.d/sites-available/default.conf /etc/nginx/conf.d/sites-enabled/
RUN cp /etc/nginx/conf.d/sites-available/client.conf /etc/nginx/conf.d/sites-enabled/
RUN cp /etc/nginx/conf.d/sites-available/api.conf /etc/nginx/conf.d/sites-enabled/

RUN sed -i 's\include /etc/nginx/conf.d/\include /etc/nginx/conf.d/sites-enabled/\g' /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]
