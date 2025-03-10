FROM node:20-alpine AS setup

WORKDIR /usr/src/app

ENV NODE_ENV=development
ARG FONTAWESOME_TOKEN
ENV FONTAWESOME_TOKEN=$FONTAWESOME_TOKEN
RUN echo $FONTAWESOME_TOKEN

COPY ./app/.npmrc ./app/package.json ./app/package-lock.json ./app/tsconfig.json ./

# # Bust that cache
# # This installs the published version of RISK module incase install is pointing at local module
ARG CACHEBUST=1
RUN npm run module:published
RUN npm install --f
#######################
## Stage 2 - Builder ##
FROM node:20-alpine AS builder
RUN apk --no-cache add git

WORKDIR /usr/src/app

ENV NODE_ENV=production

ARG SENTRY_AUTH_TOKEN
ENV SENTRY_AUTH_TOKEN=$SENTRY_AUTH_TOKEN

RUN if [ -z ${SENTRY_AUTH_TOKEN+x} ] ; then \
  echo SENTRY_AUTH_TOKEN not provided; \
  else \
  echo SENTRY_AUTH_TOKEN present; \
  fi

COPY ./app ./ 
COPY --from=setup /usr/src/app/node_modules /node_modules
# Following line can likely be removed
COPY --from=setup /usr/src/app/.npmrc /usr/src/app/package.json /usr/src/app/package-lock.json ./

ARG FONTAWESOME_TOKEN
ENV FONTAWESOME_TOKEN=$FONTAWESOME_TOKEN
RUN echo $FONTAWESOME_TOKEN

RUN npm run build:prod
##########################
## Stage 3 - App Runner ##
FROM alpine:latest as app
RUN apk add --no-cache nodejs
RUN apk add --no-cache npm
WORKDIR /usr/src/app

# Don't need this ->
ENV NODE_ENV=production
ARG FONTAWESOME_TOKEN
ENV FONTAWESOME_TOKEN=$FONTAWESOME_TOKEN
RUN echo $FONTAWESOME_TOKEN
# <- To this

# # For local testing only
# COPY ./app/env ./env
##
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder  /usr/src/app/.npmrc  /usr/src/app/package.json /usr/src/app/package-lock.json /usr/src/app/tsconfig.json ./
RUN npm install --f

# Expose ports
EXPOSE 40420
# Start App Server

# Start App
CMD ["npm", "run", "server:start"]
