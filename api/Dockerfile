FROM keymetrics/pm2:12-stretch

ENV PATH_LOG_ROOT "/var/log"
ENV PATH_LOG "$PATH_LOG_ROOT/app"

# Creating folder for logs
RUN mkdir -p $PATH_LOG

# Setting directory
WORKDIR /app
# Copying files
COPY . .

RUN touch .env

# Installing dependencies
RUN npm install --production

#Ejecutar servidor
CMD npm run migrate -d mongodb://${DBHOST}:${DBPORT}/${DBNAME}; pm2-runtime start ecosystem.config.js
