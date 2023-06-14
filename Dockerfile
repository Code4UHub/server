FROM node:18-alpine
ENV NODE_ENV production

# Install bash to enter the terminal
RUN apk update && apk add bash

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g typescript
RUN npm install -g pm2
# RUN npm install --package-lock-only
# RUN npm install --only=dev
# RUN npm i --save-dev @types/express @types/cors @types/morgan @types/jsonwebtoken
# RUN npm i --save express cors morgan jsonwebtoken


# Copy the rest of the application files
COPY . .

RUN npm run build

# Start the application
CMD ["node", "dist/server.js"]
# CMD ["tail", "-f", "/dev/null"]


