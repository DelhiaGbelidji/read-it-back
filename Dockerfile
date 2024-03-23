# Use node:18-alpine3.16 as the builder stage
FROM node:18-alpine3.16 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the Prisma schema
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Generate Prisma client
RUN npx prisma generate

# Start a new stage from node:18-alpine3.16
FROM node:18-alpine3.16

# Set the working directory in the new stage
WORKDIR /app

# Copy the node_modules from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist


# Copy the Prisma schema and any generated Prisma client
COPY --from=builder /app/prisma ./prisma

# Expose the port the app runs on
EXPOSE 6100

# Specify the command to run the application
CMD [ "npm", "run", "start:prod" ]
