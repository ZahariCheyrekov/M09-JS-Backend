const fs = require('fs');

fs.readdir('./L02_Node.jsStreamsAndUtilities/file-system', (err, data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(data);
});