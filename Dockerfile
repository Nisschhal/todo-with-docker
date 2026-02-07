# This tells Docker: "Start with this ready-made image that already has Node.js 20 installed"
# We use "alpine" version because it's small and fast
FROM node:20-alpine

# Create a folder called /app inside the container — this is where our app will live
WORKDIR /app

# ──────────────────────────────────────────────────────────────
# Step 1: Copy only the files needed for installing packages first
# Why? Docker remembers (caches) this step. If these files don't change,
# it won't reinstall everything every time → much faster builds!
# ──────────────────────────────────────────────────────────────
COPY pnpm-lock.yaml package.json ./

# Install pnpm (our package manager) globally inside the container
# We need this because the base image has npm, but not pnpm yet
RUN npm install -g pnpm

# Now install all the packages our app needs
# --frozen-lockfile = use exactly the versions in pnpm-lock.yaml (safe & consistent)
# --ignore-scripts = very important! Skip any automatic scripts (like "prisma generate")
#                    that might run during install — we do that later ourselves
RUN pnpm install --frozen-lockfile --ignore-scripts

# ──────────────────────────────────────────────────────────────
# Step 2: Now copy the Prisma files and all the rest of our code
# We copy Prisma schema first so "prisma generate" can find it
# ──────────────────────────────────────────────────────────────
COPY prisma ./prisma

# Copy everything else (source code, next.config.js, components, etc.)
COPY . .

# Now that schema.prisma is inside the container,
# we can safely generate the Prisma client code that our app uses
RUN pnpm prisma generate

# Build the Next.js app (this creates an optimized version ready for production)
# If your package.json doesn't have a "build" script → you can comment this line
RUN pnpm build

# Tell people (and Docker) that our app listens on port 3000 inside the container
# (We still need to "open" this port later when running the container)
EXPOSE 3000

# When someone starts the container, automatically run these two commands one after another:
# 1. Apply any pending database changes (migrations)
# 2. Start the Next.js production server
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start"]