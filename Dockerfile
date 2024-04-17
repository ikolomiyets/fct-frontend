FROM node:20.12.0-alpine3.19 AS build

RUN mkdir /app
ADD ./ /app/
WORKDIR /app

RUN ls -l \
 && apk add --no-cache git python3 make g++ \
 && npm install \
 && npm run build

FROM nginx:1.25.4-alpine

RUN apk -U upgrade
ADD etc/nginx.conf /etc/nginx/nginx.conf
ADD etc/default.conf /etc/nginx/conf.d/default.conf
RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

COPY --from=build /app/dist/ /usr/share/nginx/html/
