# Use an official Node.js runtime as a base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock) files first
# This allows Docker to cache dependencies if they haven't changed
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the project (assuming there's a build script in package.json)
RUN npm run build

# Expose the port that your server will be running on (e.g., 3000)
EXPOSE 3000

# Command to run your server
CMD ["node", ".output/server/index.mjs"]
