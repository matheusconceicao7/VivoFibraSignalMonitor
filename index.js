const axios = require('axios');
const fs = require('fs');

const writeToFile = (dataToWrite) => {
  fs.appendFile('signals.csv', dataToWrite, 'utf8', function (err) {
    if (err) {
      console.log('Some error occured - file either not saved or corrupted file saved.');
    }
  });
}

axios.get('http://192.168.15.1/webClient/index.html')
  .then((response) => {
    const regex = new RegExp('var opticalPower=\'.*TX:(?<TX>.*) dBm.*RX:(?<RX>.*) dBm')
    const matchGroups = response.data.match(regex).groups;
    const {
      TX,
      RX
    } = matchGroups;
    const dataToWrite = `${new Date()},${TX},${RX}\n`;
    writeToFile(dataToWrite);
  })