# Use Node.js 16 as base image (compatible with React 17)
FROM node:16-alpine

# Install git
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Set GitHub repository URL (replace with your actual repository URL)
ARG GITHUB_REPO_URL=https://github.com/swarajsharma/Fleet-Pulse-Web.git
ARG BRANCH=main

# Clone the repository
RUN git clone --branch ${BRANCH} ${GITHUB_REPO_URL} .

# Install dependencies
RUN npm install

# Run unit tests
RUN npm test -- --coverage --watchAll=false --passWithNoTests

# Expose port 3000 (default React development server port)
EXPOSE 80

# Start the application
CMD ["npm", "start"]
