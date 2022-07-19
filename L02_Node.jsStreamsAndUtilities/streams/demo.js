const fs = require('fs');

const readStream = fs.createReadStream('largeFile.txt');

readStream.on('data', (chunk) => {
    console.log(chunk);
});