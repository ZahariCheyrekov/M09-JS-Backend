const eventBus = require('./eventBus');

eventBus.subscribe('Say hello', (name) => console.log('event say hello executed  - ' + name));

const firstSayHelloUnsubscribe = eventBus.subscribe('Say hello', 'Tosho');
eventBus.subscribe('Say hello', (name) => console.log('event say hello second time - ' + name));
eventBus.subscribe('Say bye', (name, secondName) => console.log('event say bye executed - ' + name + ', ' + secondName));

eventBus.publish('Say hello', 'Pesho');
eventBus.publish('Say hello', 'Gosho');

firstSayHelloUnsubscribe();

eventBus.publish('Say bye', 'Mosho', 'Sosho');