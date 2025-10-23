FROM node:24-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN if [ "$NODE_ENV" = "development" ]; then npm run build:dev; else npm run build; fi
FROM nginx:alpine

# Default port inside the container. Platforms like Vercel set PORT at runtime and override this.
ENV PORT=8080

COPY --from=build /app/dist /usr/share/nginx/html

# Nginx config: process-wide settings (pid, logs, http block, includes)
COPY nginx.main.conf /etc/nginx/nginx.conf

# Server config
COPY default.conf.template /etc/nginx/templates/default.conf.template

# Prepare writable directories (logs, runtime dirs)
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx \
    && chown -R nginx:nginx /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html /etc/nginx/conf.d

USER nginx

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]