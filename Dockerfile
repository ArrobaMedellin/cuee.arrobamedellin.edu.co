# Use Node.js 20 as base image
# 24.22.1 corrige CVE-2026-111497 (RCE en el decodificador Brotli de Node). Versión
# exacta para que la caché de Docker no mantenga una imagen vulnerable.
FROM node:24.22.1-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Start the application
CMD ["npm", "start"]