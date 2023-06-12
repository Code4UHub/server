FROM node:18-alpine
ENV NODE_ENV production

# Install bash to enter the terminal
RUN apk update && apk add bash

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install --package-lock-only
RUN npm ci

# Copy the rest of the application files
COPY . .

# Start the application
CMD ["node", "dist/server.js"]
