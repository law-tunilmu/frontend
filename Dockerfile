FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React app (replace 'npm run build' with your build command)
RUN npm run build

# Expose a port (if your React app runs on a specific port)
EXPOSE 3000

# Define the command to start your application
CMD ["npm", "start"]
