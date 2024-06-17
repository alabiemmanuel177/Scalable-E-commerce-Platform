# Stage 1: Install dependencies
FROM node:lts-alpine AS install-dependencies

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Stage 2: Create build
FROM node:lts-alpine AS build

WORKDIR /usr/src/app

COPY --from=install-dependencies /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production image
FROM node:lts-alpine AS production

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=install-dependencies /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY package.json ./

RUN npm prune --production

EXPOSE 3003

CMD ["node", "dist/main"]

# Stage 4: Development image
FROM node:lts-alpine AS development

WORKDIR /usr/src/app

ENV NODE_ENV=development

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3003

CMD ["npm", "run", "start:dev"]
