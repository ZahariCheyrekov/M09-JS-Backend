const eventBus = require('./eventBus');

eventBus.subscribe('Say hello', () => console.log('event say hello executed'));
eventBus.subscribe('Say hello', () => console.log('event say hello second time'));
eventBus.subscribe('Say bye', () => console.log('event say bye executed'));