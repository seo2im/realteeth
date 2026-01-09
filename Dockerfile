FROM node:24-alpine

RUN apk update
RUN apk add --no-cache libc6-compat

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && \
    corepack prepare pnpm@latest-10 --activate
RUN pnpm config set store-dir /pnpm/store -g
COPY realteeth /usr/app
WORKDIR /usr/app
RUN pnpm install

EXPOSE 5173
CMD ["pnpm", "run", "dev", "--host"]