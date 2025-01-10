FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 5174

# Run the React app
CMD ["npm", "run", "dev"]