## Build
FROM node:22.15.0-bullseye AS build
WORKDIR /app
COPY ./package.json  ./package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

## Test
FROM build AS test
RUN rm -rf /app/dist
CMD ["npm", "run", "test"]

## Development
FROM build AS development
RUN rm -rf /app/dist
COPY --from=build /app /app
EXPOSE 3001
CMD ["npm", "run", "dev"]

# Production
FROM node:22.15.0-alpine AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev
EXPOSE 3001
CMD ["node", "dist/server.js"]
