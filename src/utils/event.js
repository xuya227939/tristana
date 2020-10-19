const Event = {
    message: [],
    on: function(type, fn) {
        if(typeof this.message[type] === 'undefined' ) {
            this.message[type] = [fn];
        } else {
            this.message[type].push(fn);
        }
    },

    emit: function(type, args) {
        if ( !this.message[type] )  return;
        let events = { type: type, args: args || {} }, i = 0, len = this.message[type].length;
        for ( ; i < len; i++ ) {
            this.message[type][i].call(this,events);
        }
    },

    off: function(type, fn) {
        if ( this.message[type] instanceof Array ) {
            let i = this.message[type].length - 1;
            for ( ; i >= 0; i-- ) {
                this.message[type][i] === fn && this.message[type].splice(i, 1);
            }
        }
    }
};

export default Event;