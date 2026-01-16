# Build stage
FROM node:22.5.1-alpine AS builder
WORKDIR /usr/src/app

# Copy API package files
COPY apps/api/package*.json ./
RUN npm ci

# Copy shared source files (pre-synced by GitHub Action)
COPY apps/api/src/shared ./src/shared

# Copy API source
COPY apps/api/tsconfig.json ./
COPY apps/api/src ./src

# Build TypeScript
RUN npm run build

# Production stage
FROM node:22.5.1-alpine
WORKDIR /usr/src/app

COPY apps/api/package*.json ./
RUN npm ci --omit=dev
RUN apk --no-cache add curl

# Copy built files
COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 5300
CMD ["node", "dist/index.js"]