FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY src ./src
COPY server.js config.js ./

ENV NODE_ENV=production

CMD ["npm", "start"]
