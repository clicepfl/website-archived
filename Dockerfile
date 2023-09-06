FROM node:lts-alpine

# Create a directory for your application code
WORKDIR /app

# Copy the files separately and install dependencies
COPY . .
# Should use the --production flag at some point, but we need gulp for postinstall. Maybe use multi-stage builds in the future
RUN npm install

# Change ownership of the application directory to the non-root user
RUN chown -R node:node /app

# Switch to the non-root user
USER node

# Expose the port your application will run on
EXPOSE 8000

# Command to start your Node.js application
ENV NODE_ENV=production
CMD ["node", "dist/server.js"]