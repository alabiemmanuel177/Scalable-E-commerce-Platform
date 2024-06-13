# Installing dependencies:
FROM node:lts-alpine As install-dependencies

WORKDIR /usr/src/app

RUN npm install -g npm

COPY package*.json ./

RUN npm install

COPY . .

# Creating a build:
FROM node:lts-alpine AS create-build

WORKDIR /usr/src/app

RUN npm install -g npm

COPY --from=install-dependencies /usr/src/app ./

RUN npm run build

USER node

# Running the application:
FROM node:lts-alpine as production


ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN npm install -g npm

COPY --from=install-dependencies /usr/src/app/node_modules ./node_modules
COPY --from=create-build /usr/src/app/dist ./dist
COPY package.json ./

RUN npm prune --production

EXPOSE 3001

CMD ["node", "dist/main", "npm", "run", "start:prod"]