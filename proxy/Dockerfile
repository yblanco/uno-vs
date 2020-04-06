FROM nginx:1.17.9

RUN mkdir /etc/nginx/conf.d/sites-available
RUN mkdir /etc/nginx/conf.d/sites-enabled

COPY sites-available /etc/nginx/conf.d/sites-available

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/sites-available

RUN ls -s /etc/nginx/conf.d/sites-available/default.conf /etc/nginx/conf.d/sites-enabled/
RUN ls -s /etc/nginx/conf.d/sites-available/client.conf /etc/nginx/conf.d/sites-enabled/
RUN ls -s /etc/nginx/conf.d/sites-available/server.conf /etc/nginx/conf.d/sites-enabled/

RUN sed -i 's\include /etc/nginx/conf.d/\include /etc/nginx/conf.d/sites-enabled/\g' /etc/nginx/nginx.conf


CMD ["nginx", "-g", "daemon off;"]
