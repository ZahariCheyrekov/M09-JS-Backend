const subscribers = {

}

exports.subscribe = (eventType, callback) => {
    if (!subscribers[eventType]) {
        subscribers[eventType] = [];
    }

    subscribe[eventType].push(callback);
}

exports.publish = (eventType,) => {
    subscribers[eventType].forEach(x => x());
}