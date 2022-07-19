const fs = require('fs');

const readStream = fs.createReadStream('largeFile.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('copy.txt', { encoding: 'utf-8' });

readStream.on('data', (chunk) => {
    console.log(chunk);
});

readStream.on('end', () => {
    console.log('Finished!');
});

writeStream.on('finished', () => console.log('Write stream finished!'));

writeStream.write('Hello world!');
writeStream.end();