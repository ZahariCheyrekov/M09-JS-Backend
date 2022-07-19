const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();

const readStream = fs.createReadStream('largeFile.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('copy.txt', { encoding: 'utf-8' });

// readStream.pipe(writeStream);
readStream.pipe(gzip).pipe(writeStream);