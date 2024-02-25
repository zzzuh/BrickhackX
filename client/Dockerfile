# Use an official node runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

# Build your app
RUN npm run build

# Install serve and serve the production build
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]

# Make port 3000 available outside this container
EXPOSE 3000
