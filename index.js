import _ from './src/coo';
let objA = {
    name: 'objA',
    b: {
        name: 'objB'
    }
};

let objClone = _.deepClone(objA);

console.log(objClone);