# -------- Build --------
FROM node:20-alpine AS build
WORKDIR /repo

COPY package*.json nx.json tsconfig.base.json ./
COPY apps ./apps
COPY packages ./packages

RUN npm ci

# If you use Prisma at runtime, also:
# COPY prisma ./prisma
# RUN npx prisma generate

RUN npx nx build @trinet-multivendor-ecommerce-app/auth-service
RUN npm prune --omit=dev

# -------- Run --------
FROM node:20-alpine
ENV NODE_ENV=production
ENV PORT=10000
WORKDIR /app

COPY --from=build /repo/apps/auth-service/dist ./dist
COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/package*.json ./

USER node
EXPOSE 10000
CMD ["node", "dist/main.js"]
