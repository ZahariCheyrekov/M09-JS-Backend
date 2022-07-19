const EventEmmiter = require('events');
const eventEmmiter = new EventEmmiter();

eventEmmiter.on('sing', (songTitle) => {
    console.log(songTitle + ' - sdfvadps')
});

eventEmmiter.emit('sing', 'Nothing else matters');