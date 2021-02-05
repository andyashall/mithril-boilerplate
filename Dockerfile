FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
# # Create a group and user
# RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# # Tell docker that all future commands should run as the appuser user
# USER appuser
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../ 
COPY . .
EXPOSE 3000
CMD ["npm", "run", "prod"]
