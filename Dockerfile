# => Build container
FROM node:alpine AS builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# => Run container
FROM nginx:1.15.2-alpine

# Add bash
RUN apk add --no-cache bash

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf/conf.d/ /etc/nginx/conf.d/

# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

# Normalize line endings and make the script executable
RUN sed -i 's/\r$//' ./env.sh && chmod +x ./env.sh

# Start Nginx server
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]

