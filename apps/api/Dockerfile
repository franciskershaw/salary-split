# Build stage - Compiles TypeScript to JavaScript
FROM node:22.5.1-alpine AS builder

# Set working directory for build stage
WORKDIR /usr/src/app

# Copy root package files for workspace setup
COPY package*.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package*.json ./apps/api/

# Install ALL dependencies (including workspace packages)
RUN npm ci

# Copy shared package source
COPY packages/shared ./packages/shared

# Copy API source code
COPY apps/api/src ./apps/api/src
COPY apps/api/tsconfig.json ./apps/api/

# Build shared package first
RUN npm run build --workspace=@salary-split/shared

# Build API
RUN npm run build --workspace=api

# -----------------------------------------------------------------------------

# Production stage - Lighter image with only production dependencies
FROM node:22.5.1-alpine

# Set working directory for production stage
WORKDIR /usr/src/app

# Copy root package files
COPY package*.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package*.json ./apps/api/

# Install only production dependencies
RUN npm ci --omit=dev

# Install curl for health checks
RUN apk --no-cache add curl

# Copy built JavaScript files from builder stage
COPY --from=builder /usr/src/app/apps/api/dist ./apps/api/dist
COPY --from=builder /usr/src/app/packages/shared/src ./packages/shared/src

# Expose API port
EXPOSE 5300

# Start the Node.js application
CMD ["node", "apps/api/dist/index.js"]
