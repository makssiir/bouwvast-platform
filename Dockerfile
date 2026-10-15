# syntax=docker/dockerfile:1
# Production image: prerendered static site + zero-dependency lead server.
#
#   docker build --build-arg SITE_ORIGIN=https://huisklusdienst.nl -t huisklusdienst .
#   docker run -p 3000:3000 -v huisklusdienst-data:/data --env-file .env huisklusdienst
#
# SITE_ORIGIN (and SITE_INDEXING / INDEX_CITY_PAGES) are baked into the HTML
# at build time; server settings (notifications, rate limits…) are runtime env.

FROM node:22.18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG SITE_ORIGIN=""
ARG SITE_INDEXING="true"
ARG INDEX_CITY_PAGES="true"
ENV SITE_ORIGIN=$SITE_ORIGIN SITE_INDEXING=$SITE_INDEXING INDEX_CITY_PAGES=$INDEX_CITY_PAGES
RUN npm run typecheck && npm run verify:leads && npm run build && npm run verify:routes

FROM node:22.18-alpine AS runtime
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0 DATA_DIR=/data DIST_DIR=/app/dist
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/server ./server
COPY --from=build /app/src/lib/leadSchema.ts ./src/lib/leadSchema.ts
COPY package.json ./
RUN mkdir -p /data && chown node:node /data
USER node
VOLUME ["/data"]
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- "http://127.0.0.1:${PORT}/healthz" >/dev/null || exit 1
CMD ["node", "server/index.mjs"]
