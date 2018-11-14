/**
 * for：一些时间处理
 * Created by 王佳欣 on 2018/11/8.
 */
// 分钟、小时、日、周、月、年对应的描述
const SECOND_ARRAY = [60, 60, 24, 7, 365/12/7, 12];

/**
 * 时间差
 * @param startTime
 * @param endTime
 * @returns {number}
 */
const diffTimestamp = (startTime = Date.now(), endTime = Date.now()) => {
    startTime = toTimestamp(startTime);
    endTime = toTimestamp(endTime);
    return endTime - startTime;
};

/**
 * 转化为 Date类型
 * @param input
 * @returns {Date}
 */
export const toDate = (input) => {
    if (input instanceof Date) {
        return input;
    }
    if (!isNaN(input) || /^\d+$/.test(input)) {
        return new Date(parseInt(input));
    }

    input = (input || '').trim().replace(/\.\d+/, '')                           // 删除毫秒 milliseconds
        .replace(/-/, '/').replace(/-/, '/')                                    // 替换字符，safari浏览器时间的问题
        .replace(/(\d)T(\d)/, '$1 $2').replace(/Z/, ' UTC')                     // 2017-2-5T3:57:52Z -> 2017-2-5 3:57:52UTC
        .replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2');                             // -04:00 -> -0400

    return new Date(input);
};

/**
 * // 转为时间戳
 * @param input
 * @returns {*}
 */
export const toTimestamp = (input) => {
    return toDate(input).valueOf();
};

/**
 * 时间正则格式化
 * @param time
 * @param fmt
 * @returns {string}
 */
export const format = (time = new Date(), fmt = 'yyyy-MM-dd hh:mm:ss') => {
    let date = toDate(time);

    let o = {
        'M+': date.getMonth() + 1,                     // 月份
        'd+': date.getDate(),                          // 日
        'h+': date.getHours(),                         // 小时
        'm+': date.getMinutes(),                       // 分
        's+': date.getSeconds(),                       // 秒
        'S': date.getMilliseconds()                    // 毫秒
    };

    // 年份，4位数
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
    }

    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : `00${o[k]}`.substr(`${ o[k]}`.length));
        }
    }
    return fmt;
};

/**
 * 时间间隔格式化
 * @param time
 * @param diff
 * @param fmt
 * @returns {string}
 */
export const formatDiff = (time = new Date(), diff, fmt = 'yyyy-MM-dd hh:mm:ss') => {
    let timestamp = toTimestamp(time);
    timestamp += diff;
    return format(timestamp, fmt);
};

// 时间格式
const AGO_FORMAT= [
    ['刚刚', '片刻后'],
    ['%s 秒前', '%s 秒后'],
    ['%s 分钟前', '%s 分钟后'],
    ['%s 小时前', '%s 小时后'],
    ['%s 天前', '%s 天后'],
    ['%s 周前', '%s 周后'],
    ['%s 月前', '%s 月后'],
    ['%s 年前', '%s 年后']
];

/**
 * 时间格式化
 * 3年前，3月前，3星期前，3天前，3小时前，52分钟前，刚刚
 * @param time
 */
export const formatAgo = (time) => {
    let timestamp = diffTimestamp(time) / 1000;
    let agoIndex = timestamp > 0 ? 0 : 1;
    timestamp = Math.abs(timestamp);
    let index = 0;
    for (; timestamp > SECOND_ARRAY[index] && index < SECOND_ARRAY.length; index++) {
        timestamp /= SECOND_ARRAY[index];
    }
    if (timestamp > (index === 0 ? 9 : 1)) index += 1;
    timestamp = parseInt(timestamp);
    return AGO_FORMAT[index][agoIndex].replace('%s', timestamp);
};

/**
 * 计时器
 */
export const timer = ({
    second,                                 // 时间数
    type = 'countdown',                     // 倒计时，可取timer、countdown；time为正序计时，countdown为倒计时
    delay = 1000,                           // 计时间隔
    immediate = true,                       // 马上执行回调
    func,                                   // 回调方法
}) => {
    // 建立两个时间戳
    // 解决，比如，屏幕息屏后造成的倒计时中断问题
    let preTimestamp = Date.now(),
        timestamp,
        diff,
        remind;
    let timing = (second, delay, func) => {
        timing.timeId = setTimeout(() => {
            clearTimeout(timing.timeId);
            timestamp = Date.now();
            diff = parseInt((timestamp - preTimestamp) / 1000) * 1000;
            remind = second + (type === 'countdown' ? -diff : diff);
            // 回调func方法
            // 你可以再回调函数里根据剩余时间，做终止计时等等
            func && func(remind);
            timing(remind, delay, func);
            preTimestamp = timestamp;
        }, delay);
    };

    // 终止倒计时
    timing.stop = () => {
        clearTimeout(timing.timeId);
    };
    // 重重新启动
    timing.restart = () => {
        timing(remind, delay, func);
    };

    timing(second, delay, func);
    immediate && func && func(second);

    return timing;
};