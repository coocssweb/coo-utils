/**
 * Created by coocss on 2019/2/20.
 */
function largeNum (a, b) {
    let res = '', c = 0;
    a = a.split('');
    b = b.split('');
    while (a.length || b.length || c) {
        c += ~~a.pop() + ~~b.pop();
        res = c % 10 + res;
        c = c > 9;
    }

    return res;
}

console.log(largeNum('6' , '9'));
