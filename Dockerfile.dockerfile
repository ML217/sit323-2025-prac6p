#base image
FROM node:18
#Setup work dictionary
WORKDIR /app
#Copy json package and install dependcies
COPY package*.json ./
RUN npm install
#Copy Source Code
COPY . .
#Expose Application Port
EXPOSE 3000
#Let roll
CMD [ "node","Calculator.js" ]