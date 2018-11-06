/**
 * for：用于生成唯一值
 * demo：166dde2f6211d5-0cb6564048e0c6-1e3f6654-2073600-166dde2f623254
 * 通过当前时间、UserAgent信息、随机值、位运算
 * Created by 王佳欣 on 2018/11/4.
 */
export default () => {
    // 当前时间
    function nowTime() {
        let d = 1 * new Date(), i = 0;
        while (d === 1 * new Date()) {
            i++
        }
        return d.toString(16) + i.toString(16);
    }

    // 随机数
    function randomNum() {
        return Math.random().toString(16).replace('.', '');
    }

    // userAgent
    function ua(n) {
        let ua = navigator.userAgent, i, ch, buffer = [], ret = 0;

        function xor (result, byte_array) {
            let j, tmp = 0;
            for (j = 0; j < byte_array.length; j++) {
                tmp |= (buffer[j] << j * 8);
            }
            return result ^ tmp;
        }

        for (i = 0; i < ua.length; i++) {
            ch = ua.charCodeAt(i);
            buffer.unshift(ch & 0xFF);
            if (buffer.length >= 4) {
                ret = xor(ret, buffer);
                buffer = [];
            }
        }

        if (buffer.length > 0) {
            ret = xor(ret, buffer);
        }

        return ret.toString(16);
    }

    // 有些浏览器取个屏幕宽度都异常
    let se = String(screen.height * screen.width);
    if (se && /\d{5,}/.test(se)) {
        se = se.toString(16);
    } else {
        se = String(Math.random() * 31242).replace('.', '').slice(0, 8);
    }

    let val = (nowTime() + '-' + randomNum() + '-' + ua() + '-' + se + '-' + nowTime());
    if (val) {
        return val;
    } else {
        return (String(Math.random()) + String(Math.random()) + String(Math.random())).slice(2, 15);
    }
};
