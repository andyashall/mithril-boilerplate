FROM node:12.18-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN useradd -r -u 1001 -g appuser appuser
USER appuser
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
