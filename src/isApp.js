/**
 * for：根据UA头判断是否是某个APP
 * demo ========================
 * if (IsApp.wechat()) {
 *      console.log('微信');
 * }
 * =============================
 * Created by 王佳欣 on 2018/11/4.
 */

export default (() => {
    const USER_AGENT = navigator.userAgent;
    let isAndroid,
        isIos,
        isWechat,
        isWorkWechat,
        isQQ,
        isWeibo,
        isQQZone;

    return {
        android () {
            if (isAndroid === null) {
                isAndroid = /android/.test(USER_AGENT);
            }
            return isAndroid;
        },
        ios () {
            if (isIos === null) {
                isIos = /iphone|ipad|ipod/.test(USER_AGENT);
            }
            return isIos;
        },
        wechat () {
            if (isWechat === null) {
                isWechat = /micromessenger/.test(USER_AGENT) && !/wxwork/.test(USER_AGENT);
            }
            return isWechat;
        },
        workWechat () {
            if (isWorkWechat === null) {
                isWorkWechat = /micromessenger/.test(USER_AGENT) && /wxwork/.test(USER_AGENT);
            }
            return isWorkWechat;
        },
        qq () {
            if (isQQ === null) {
                isQQ = /qq\//.test(USER_AGENT);
            }
            return isQQ;
        },
        weibo () {
            if (isWeibo === null) {
                isWeibo = /weibo/.test(USER_AGENT);
            }
            return isWeibo;
        },
        qqzone () {
            if (isQQZone === null) {
                isQQZone = /qzone\//.test(USER_AGENT);
            }
            return isQQZone;
        }
    }
})();
