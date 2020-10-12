FROM node:14.1-alpine AS builder

WORKDIR /opt/web
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx:1.16.0-alpine

# set AppRole environment variables
ENV APPROLE_ID ${approle_id}
ENV APPROLE_SECRET_ID ${approle_secret_id}

COPY --from=builder /opt/web/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]