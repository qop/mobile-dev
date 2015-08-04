emitter.on('timeout', function(data) {
    console.log(data);
});

emitter.emit('timeout', {});

PubSub = {
    handlers: {}
};
PubSub.on = function(eventName, handler) {
    if (!(eventName in this.handlers)) {
        this.handlers[eventName] = [];
    }
    this.handlers[eventName].push(handlers);
    return this;
};
PubSub.emit = function(eventName) {
    var handlerArgs = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, i < this.handlers[eventName].length; i++) {
        this.handlers[eventName][i].apply(this.handlerArgs);
    }
    return this;
};