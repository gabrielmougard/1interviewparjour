FROM node:14.1-alpine AS builder

WORKDIR /opt/web
COPY ../../../web/package.json ./
COPY ../../../web/package-lock.json ./
RUN npm install

COPY ../../../web ./
RUN npm run build

FROM nginx:1.17-alpine

# set environment variables
ENV APPROLE_ID ${approle_id}
ENV APPROLE_SECRET_ID ${approle_secret_id}

# Test that the environment variables are set
RUN echo "Here is the approle_id : $APPROLE_ID"
RUN echo "Here is the approle_secret_id : $APPROLE_SECRET_ID"

RUN apk --no-cache add curl
RUN curl -L https://github.com/a8m/envsubst/releases/download/v1.1.0/envsubst-`uname -s`-`uname -m` -o envsubst && \
    chmod +x envsubst && \
    mv envsubst /usr/local/bin

COPY ../../../web/nginx.config /etc/nginx/nginx.template
COPY --from=builder /opt/web/build /usr/share/nginx/html

CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]