class RsyncOperation {
    constructor(fn, cancelFn) {
        this.promise = new Promise(fn);
        this.cancelFn = cancelFn;
        this.onProgressHandlers = [];
    }
    cancel() {
        this.cancelFn();
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