const subscribers = {

}

exports.subscribe = (eventType, callback) => {
    if (!subscribers[eventType]) {
        subscribers[eventType] = [];
    }

    subscribers[eventType].push(callback);
}

exports.publish = (eventType,) => {
    subscribers[eventType].forEach(x => x());
}