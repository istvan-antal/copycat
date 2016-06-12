class RsyncOperation extends Promise {
    constructor(fn) {
        super(fn);
        this.onProgressHandlers = [];
    }
    onProgress(fn) {
        this.onProgressHandlers.push(fn);
        return this;
    }
    makeProgress(progress) {
        this.onProgressHandlers.forEach((fn) => {
            fn(progress);
        });
    }
}

module.exports.RsyncOperation = RsyncOperation;