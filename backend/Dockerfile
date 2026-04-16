# Stage 1: Build
FROM node:20-alpine AS builder

# Install build dependencies for native modules if needed
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies including dev dependencies
RUN npm install

# Copy source code
COPY . .

# Build the project (compiles TypeScript to dist/)
RUN npm run build

# Stage 2: Runner
FROM node:20-alpine AS runner

WORKDIR /app

# Install curl for healthcheck
RUN apk add --no-cache curl

# Add secure non-root user
RUN addgroup app && adduser -S -G app app

ENV NODE_ENV=production

# Copy package files
COPY package*.json ./

# Install ONLY production dependencies and ensure permissions
RUN npm install --production --omit=dev

# Copy compiled JavaScript code from builder
COPY --from=builder /app/dist ./dist

# Change ownership of the app directory files to the 'app' user
RUN chown -R app:app /app

# Switch to the non-root user
USER app

# Expose port
EXPOSE 5000

# Run with pure Node.js
CMD ["npm", "run", "start:prod"]
