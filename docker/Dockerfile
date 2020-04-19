FROM node:13.13-stretch as build-stage

ARG VUE_APP_API_URL

WORKDIR /app
COPY package.json /app/package.json
RUN apt-get update
RUN npm install --silent
RUN npm install @vue/cli@4.3.1 -g --silent
COPY . /app
ENV VUE_APP_API_URL $VUE_APP_API_URL
RUN npm run build

FROM nginx:alpine as production-stage
RUN apk update
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY /docker/nginx.conf /etc/nginx/nginx.conf


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]