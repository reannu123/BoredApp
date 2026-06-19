# Client image: build the Create React App bundle, then serve it with nginx.
# CRA bakes REACT_APP_* vars at BUILD time, so the API/auth URLs come in as
# build args (see docker-compose).

FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
ARG REACT_APP_API_URL=http://localhost:5000
ARG REACT_APP_AUTH_URL=http://localhost:5001/auth
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_AUTH_URL=$REACT_APP_AUTH_URL
COPY . .
RUN npm run build

FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
