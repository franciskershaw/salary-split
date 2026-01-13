# Build stage - Compiles TypeScript to JavaScript
FROM node:22.5.1-alpine AS builder

# Set working directory for build stage
WORKDIR /usr/src/app

# Copy root workspace files first
COPY package*.json ./

# Copy workspace package.json files (so npm knows about workspaces)
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package*.json ./apps/api/

# Install dependencies (workspace-aware)
RUN npm ci

# Copy shared package source (needed for the build)
COPY packages/shared ./packages/shared

# Copy API source
COPY apps/api/tsconfig.json ./apps/api/
COPY apps/api/src ./apps/api/src

# Build (workspace commands)
RUN npm run build --workspace=@salary-split/shared
RUN npm run build --workspace=api

# -----------------------------------------------------------------------------

# Production stage - Lighter image with only production dependencies
FROM node:22.5.1-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy root workspace files
COPY package*.json ./
COPY packages/shared/package.json ./packages/shared/
COPY apps/api/package*.json ./apps/api/

# Install ONLY production dependencies
RUN npm ci --omit=dev

# Install curl for health checks
RUN apk --no-cache add curl

# Copy built files from builder
COPY --from=builder /usr/src/app/apps/api/dist ./apps/api/dist

# Copy shared package source (needed at runtime since it's TypeScript, not compiled)
COPY --from=builder /usr/src/app/packages/shared ./packages/shared

# Expose API port
EXPOSE 5300

# Start the application
CMD ["node", "apps/api/dist/index.js"]