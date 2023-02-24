FROM node:lts

# Install Corepack. Corepack is included by default with all Node.js installs we only need to enable it.
RUN corepack enable && \
# Updating the global Yarn version
corepack prepare yarn@stable --activate && \
yarn global add vercel

WORKDIR /app

COPY . /app

RUN yarn

CMD [ "yarn", "dev" ]
