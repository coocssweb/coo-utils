/**
 * Created by coocss on 2019/2/20.
 */
 function combination(array, size) {
    let result = [];
    if (size && size === 1) {
        array.map((item, index) => {
            result[index] = [item];
        });
        return result;
    }

    if (array.length === 2) {
        if (array[0] === array[1]) {
            return [array[0], array[1]];
        }
        return [
            [array[0], array[1]],
        ];
    }

    while (array.length) {
        let number = array[0];
        array.splice(0, 1);
        let temp = [].concat(array);
        combination(temp, size - 1).map((item) => {
            result.push([number, ...item]);
        });
    }

    return result;
};

let result = combination([1, 2, 3, 4], 3);
console.log(result);
