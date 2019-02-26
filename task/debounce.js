function throttler(todo, options = {time: 300, immediately: true}) {
    let timeout;
    let self = this;
    function handler(context, ...args) {
        todo.call(context, ...args);
        clearTimeout(timeout);
        timeout = null;
    }
    
    let fn = function (...args) {
        let self = this;
        if (options.immediately) {
            options.immediately = false;
            handler(self, ...args);
        }

        if (!options.immediately) {
            if (timeout) {
                return;
            }

            timeout = setTimeout(() => {
                handler(self, ...args);
            }, options.time);
        }
    };
    
    fn.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return fn;
}

let person = {
    name: 'wjx',
    showName (age) {
        console.log(this.name, age);
    },
    init () {
        window.addEventListener('scroll', throttler(this.showName.bind(this, 19)), false);
    }
};

person.init();
