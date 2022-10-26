const Event: any = {
    message: [],
    on: function (type, fn) {
        if (typeof this.message[type] === 'undefined') {
            // @ts-ignore
            this.message[type] = [fn];
        } else {
            // @ts-ignore
            this.message[type].push(fn);
        }
    },

    emit: function (type, args) {
        if (!this.message[type]) return;
        // @ts-ignore
        let events = { type: type, args: args || {} },
            i = 0,
            len = this.message[type].length;
        for (; i < len; i++) {
            // @ts-ignore
            this.message[type][i].call(this, events);
        }
    },

    off: function (type, fn) {
        // @ts-ignore
        if (this.message[type] instanceof Array) {
            // @ts-ignore
            let i = this.message[type].length - 1;
            for (; i >= 0; i--) {
                // @ts-ignore
                this.message[type][i] === fn && this.message[type].splice(i, 1);
            }
        }
    }
};

export default Event;
