FROM node:14.1-alpine AS builder

ARG BUILD_COMMIT_ID
ENV REACT_APP_BUILD_COMMIT_ID $BUILD_COMMIT_ID

WORKDIR /opt/web
COPY package.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=builder /opt/web/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]