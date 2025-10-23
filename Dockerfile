FROM node:24-alpine AS build
WORKDIR /app

# App configuration (provide via build args in CI or .env for local builds)
ARG ENV
ARG NODE_ENV
ARG API_URL
ARG CORS_ORIGIN
ARG GOOGLE_ADSENSE_PUBLISHER_ID
ARG GOOGLE_ADSENSE_TEST_SLOT
# Expose as environment variables so the Webpack build (dotenv + DefinePlugin) can read them
# IMPORTANT: Do NOT set NODE_ENV here so npm ci installs devDependencies needed for the build.
ENV API_URL=${API_URL} \
    CORS_ORIGIN=${CORS_ORIGIN} \
    GOOGLE_ADSENSE_PUBLISHER_ID=${GOOGLE_ADSENSE_PUBLISHER_ID} \
    GOOGLE_ADSENSE_TEST_SLOT=${GOOGLE_ADSENSE_TEST_SLOT} \
    HUSKY=0

COPY package*.json ./
# Install dependencies without running lifecycle scripts (skips husky prepare)
RUN npm ci --ignore-scripts

COPY . .

RUN if [ "$NODE_ENV" = "development" ]; then npm run build:dev; else npm run build; fi
FROM nginx:alpine

# Re-declare build args in final stage to allow promotion to runtime envs
ARG ENV
ARG NODE_ENV
ARG API_URL
ARG CORS_ORIGIN
ARG GOOGLE_ADSENSE_PUBLISHER_ID
ARG GOOGLE_ADSENSE_TEST_SLOT

# Default port inside the container and promote selected build args to runtime envs
ENV PORT=8080 \
    ENV=${ENV} \
    NODE_ENV=${NODE_ENV} \
    API_URL=${API_URL} \
    CORS_ORIGIN=${CORS_ORIGIN} \
    GOOGLE_ADSENSE_PUBLISHER_ID=${GOOGLE_ADSENSE_PUBLISHER_ID} \
    GOOGLE_ADSENSE_TEST_SLOT=${GOOGLE_ADSENSE_TEST_SLOT}

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