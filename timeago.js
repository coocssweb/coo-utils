/**
 * for：一些时间处理
 * Created by 王佳欣 on 2018/11/8.
 */
// 单位换算
const DAY_TO_SECOND = 24 * 60 * 60 * 1000;
const HOUR_TO_SECOND = 60 * 60 * 1000;
const MINUTE_TO_SECOND = 60 * 1000;

// 转为date
export const toDate = (input) => {
    if (input instanceof Date) {
        return input;
    }
    if (!isNaN(input) || /^\d+$/.test(input)) {
        return new Date(parseInt(input));
    }

    input = (input || '').trim().replace(/\.\d+/, '') // 删除毫秒 milliseconds
        .replace(/-/, '/').replace(/-/, '/')
        .replace(/(\d)T(\d)/, '$1 $2').replace(/Z/, ' UTC') // 2017-2-5T3:57:52Z -> 2017-2-5 3:57:52UTC
        .replace(/([\+\-]\d\d)\:?(\d\d)/, ' $1$2'); // -04:00 -> -0400

    return new Date(input);
};

// 转为时间戳
export const toTimestamp = (input) => {
    return toDate(input).valueOf();
};

// 时间格式化
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

// 时间间隔格式化
export const formatDiff = (time = new Date(), diff, fmt = 'yyyy-MM-dd hh:mm:ss') => {
    let timestamp = toTimestamp(time);
    timestamp += diff;
    return format(timestamp, fmt);
};

// 时间间隔
// type 可取值，year、month、day、hour、minute 或者空
export const diff = (startTime = Date.now(), endTime = Date.now(), type = 'day') => {
    startTime = toTimestamp(startTime);
    endTime = toTimestamp(endTime);
    let timeDiff = endTime - startTime;

    let result = {
        day: parseInt(timeDiff / DAY_TO_SECOND),
        hour: parseInt(timeDiff / HOUR_TO_SECOND),
        minute: parseInt(timeDiff / MINUTE_TO_SECOND),
        second: parseInt(timeDiff / 1000),
    };

    return type ? result[type] : result;
};
