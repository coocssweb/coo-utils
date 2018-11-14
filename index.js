import * as Timeago from './src/timeago';

let countdown = Timeago.timer({second: 60000, func: (value) => {
        console.log(value);
        if (value <= 0) {
            countdown.stop();
        }
    }
});

let countdown2 = Timeago.timer({second: Date.now(), type: 'timer', func: (value) => {
        console.log(Timeago.format(value, 'hh:mm:ss'));
    }
});

document.querySelector('.btn-stop').onclick = function () {
    countdown.stop();
};