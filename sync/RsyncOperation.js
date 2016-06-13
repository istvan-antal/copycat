class RsyncOperation {
    constructor(fn) {
        this.promise = new Promise(fn);
        this.onProgressHandlers = [];
    }
    onProgress(fn) {
        this.onProgressHandlers.push(fn);
        return this;
    }
    then(resolve, reject) {
        this.promise.then(resolve, reject);
        return this;
    }
    makeProgress(progress) {
        this.onProgressHandlers.forEach((fn) => {
            fn(progress);
        });
    }
}

module.exports.RsyncOperation = RsyncOperation;