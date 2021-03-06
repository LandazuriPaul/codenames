# Builder
FROM node:12-alpine as builder

# Copy client and domain + lib packages
WORKDIR /usr/src/codenames/
COPY .eslintrc .
COPY .eslintignore .
COPY package.json .
COPY tsconfig.json .
COPY yarn.lock .

COPY packages/client packages/client
COPY packages/domain packages/domain
COPY packages/lib packages/lib

# Install domain + lib + client dependencies
RUN yarn install --pure-lockfile --non-interactive

# Build common packages
RUN yarn build:common

# Build client then
WORKDIR /usr/src/codenames/packages/client
RUN yarn build

# Runner
FROM nginx:alpine as runner

# Copy the nginx configuration
COPY packages/client/nginx.conf /etc/nginx/nginx.conf

# Copy the built static files to nginx + dictionaries
COPY --from=builder /usr/src/codenames/packages/client/dist /usr/share/nginx/html
