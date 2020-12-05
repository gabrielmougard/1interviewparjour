FROM node:14.1-alpine AS builder

WORKDIR /opt/web
COPY package.json ./
RUN npm install

# hostname of backend in docker network
ENV API_URL http://1interviewparjour:8000
ENV ROOT_URL https://1interviewparjour.com

COPY . ./
RUN npm run build

FROM nginx:1.16.0-alpine

COPY --from=builder /opt/web/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]