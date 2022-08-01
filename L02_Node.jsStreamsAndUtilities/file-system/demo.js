const fs = require('fs');

// const text = fs.readFileSync('./L02_Node.jsStreamsAndUtilities/file-system/text.txt', { encoding: 'utf-8' });
fs.readFile('./L02_Node.jsStreamsAndUtilities/file-system/text.txt', { encoding: 'utf-8' },
    (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(data);
    });