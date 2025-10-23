# Step 1: Build the app
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
RUN npm run build

# Step 2: Serve the static files
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# This ensures all client-side routes fallback to index.html.
COPY nginx.conf /etc/nginx/conf.d/default.conf 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]