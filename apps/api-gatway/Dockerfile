# ---------- Build ----------
FROM node:20-alpine AS build
WORKDIR /repo
COPY package*.json nx.json tsconfig.base.json ./
COPY apps ./apps
COPY libs ./libs
RUN npm ci
RUN npx nx build @trinet-multivendor-ecommerce-app/api-gatway

# ---------- Run ----------
FROM node:20-alpine
ENV NODE_ENV=production
ENV PORT=10000
WORKDIR /app
COPY --from=build /repo/dist/apps/api-gatway ./dist
# if your runtime imports need deps, install prod deps (safe no-op otherwise)
COPY package*.json ./
RUN npm ci --omit=dev || true
USER node
EXPOSE 10000
CMD ["node", "dist/main.js"]
