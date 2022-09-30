#  Dockerfile for Node Express Backend

FROM node:18.8-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install


# Copy app source code
COPY . .

# Exports
EXPOSE 3001

CMD ["npm","start"]
