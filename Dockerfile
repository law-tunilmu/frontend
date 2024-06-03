# module install
FROM node:18-alpine as module-install-stage
WORKDIR /app
COPY package*.json ./
RUN npm install

# build
FROM node:18-alpine as build-stage
COPY --from=module-install-stage /app/node_modules/ /app/node_modules
WORKDIR /app
COPY . .
RUN npm run build

# serve
FROM node:18-alpine
COPY --from=build-stage /app/build/ /app/build

RUN npm install -g serve
EXPOSE 3000
CMD serve -s /app/build -l 3000