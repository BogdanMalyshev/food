'use strict';

const persone = {
    name: 'Alex',
    tel: +345555555,
    parent: {
        mom: 'Olga',
        dad: 'Art'
    }
};

const clone = JSON.parse(JSON.stringify(persone));
clone.parent.mom = 'Ann';
console.log(clone.parent.mom);
console.log(persone.parent.mom);