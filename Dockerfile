FROM node:alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional
COPY . .

CMD ["yarn", "build"]