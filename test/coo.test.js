/**
 * Created by zj-db0666 on 2018/11/12.
 */
import assert from 'assert';
import _ from '../src/coo';

describe('coo库测试', function() {
    it('_.equal', function() {
        assert.strictEqual(_.equal({a: "a", b: ["1", 2]}, {a: "a", b: ["1", 2]}), true);
        assert.strictEqual(_.equal({c: "1"}, {c: 1}), false);
    });

    it('_.type', function() {
        assert.strictEqual(_.type(/^[a-b]*$/), 'regexp');
        assert.strictEqual(_.type(new Date()), 'date');
        assert.strictEqual(_.type([1, 2, 3, 4]), 'array');
    });

    it('_.deepClone', function() {
        let objA = {
            name: 'objA',
            b: {
                name: 'objB'
            }
        };

        let objClone = _.deepClone(objA);
        objA.b.name = 'changedA';
        assert.strictEqual(objClone.b.name, 'objB');
        assert.strictEqual(objA.b.name, 'changedA');
    });
});
