import assert from 'assert';
import * as timeago from '../src/timeago';

describe('timeago测试', function() {
    it('format 格式化', function() {
        assert.strictEqual(timeago.format(1542115310324, "yyyy-MM-dd hh:mm"), '2018-11-13 21:21');
    });

    it('time ago 测试', function() {
        let timestamp1 = Date.now() - 100 * 1000;
        let timestamp2 = Date.now() - 8000;
        let timestamp3 = Date.now() + 130 * 60 * 1000;
        assert.strictEqual(timeago.formatAgo(timestamp1), '1 分钟前');
        assert.strictEqual(timeago.formatAgo(timestamp2), '刚刚');
        assert.strictEqual(timeago.formatAgo(timestamp3), '2 小时后');
    });
});
