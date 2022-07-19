const fs = require('fs');

const readStream = fs.createReadStream('largeFile.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream();

readStream.on('data', (chunk) => {
    console.log(chunk);
});

readStream.on('end', () => {
    console.log('Finished!');
});