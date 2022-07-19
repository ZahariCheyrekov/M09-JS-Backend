const fs = require('fs');

const readStream = fs.createReadStream('largeFile.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('copy.txt', { encoding: 'utf-8' });

readStream.pipe(writeStream);