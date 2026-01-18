# ---------------------------------------
# Stage 1: Build Stage
# ---------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build TypeScript
RUN pnpm build

# ---------------------------------------
# Stage 2: Production Stage
# ---------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Install pnpm in the runner stage too ---
RUN npm install -g pnpm
# ---------------------------------------------------------

COPY package.json pnpm-lock.yaml ./

# Install production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copying the built JS files from the builder stage
COPY --from=builder /app/dist ./dist
# Copying schema for Drizzle
COPY --from=builder /app/src/db/schema.ts ./src/db/schema.ts

# Set environment to production
ENV NODE_ENV=production

# Expose the port
EXPOSE 8000

# The Command to start the app
CMD ["node", "dist/index.js"]