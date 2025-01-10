FROM node:20-alpine
WORKDIR /app
# copy packege files
COPY package*.json ./
RUN npm install
# copy rest of the code
COPY . .

EXPOSE 8000

CMD ["nodemon","app.js"]
