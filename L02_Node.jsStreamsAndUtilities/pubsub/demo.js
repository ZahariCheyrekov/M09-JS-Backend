const eventBus = require('./eventBus');

eventBus.subscribe('Say hello', (name) => console.log('event say hello executed  - ' + name));
eventBus.subscribe('Say hello', (name) => console.log('event say hello second time - ' + name));
eventBus.subscribe('Say bye', (name) => console.log('event say bye executed - ' + name));

eventBus.publish('Say hello', 'Pesho');
eventBus.publish('Say hello', 'Gosho');
eventBus.publish('Say bye', 'Mosho');