/**
 * Created by zj-db0666 on 2018/11/12.
 */
import assert from 'assert';
import _ from '../src/coo';

describe('强等于测试', function() {
    it('{a: "a", b: ["1", 2]} 应该等于{a: "a", b: ["1", 2]}', function() {
        assert.strictEqual(_.equal({a: "a", b: ["1", 2]}, {a: "a", b: ["1", 2]}), true);
    });

    it('{c: "1"} 应该等于{c: 1}', function() {
        assert.strictEqual(_.equal({c: "1"}, {c: 1}), false);
    });
});
