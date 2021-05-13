const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();



const writeToFile = (dataToWrite) => {
  const filePath = path.join('./', 'monitoring', process.env.FILE_NAME);
  fs.appendFile(filePath, dataToWrite, 'utf8', function (err) {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    }
  });
}

const getData = () => axios.get('http://192.168.15.1/webClient/index.html')
  .then((response) => {
    const regex = new RegExp('var opticalPower=\'.*TX:(?<TX>.*) dBm.*RX:(?<RX>.*) dBm')
    const matchGroups = response.data.match(regex).groups;
    const {
      TX,
      RX
    } = matchGroups;
    return `${new Date().toISOString()},${TX},${RX}\n`;
  })

  setInterval(() => {
    getData().then((dataToWrite) => {
      console.log(dataToWrite);
      writeToFile(dataToWrite)
    });
    
  }, process.env.MONITORING_INTERVAL);
