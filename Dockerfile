FROM node:18-alpine

ENV NODE_ENV=production
ARG NPM_BUILD="npm install"
EXPOSE 8080/tcp

LABEL maintainer="Clearway"
LABEL summary="Clearway Image"
LABEL description="Clearway App Deployment"

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN $NPM_BUILD

COPY . .

ENTRYPOINT [ "node" ]
CMD ["src/index.mjs"]