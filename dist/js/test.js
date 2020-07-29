'use strict';

console.log('Запрос данных на сервер!');

const prom = new Promise((res, rej)=>{
    setTimeout(()=>{
        console.log('Подготовка данных с сервера...');

        const pruduct = {
            name: 'tv',
            price:'2000'
        };

        res(pruduct);
        rej();
    },2000);
});



prom.then((pruduct)=>{
    setTimeout(()=>{
        pruduct.status = 'order';
        
    },2000);
    return(pruduct);
}).then((data)=>{
    setTimeout(()=>{console.log('данные с сервера успешно дошли!');},2000);
    return(data);
}).then((data)=>{
    setTimeout(()=>{console.log(data);},2000);
}).catch(()=>{
    console.log('Что то пошло не так как мы изначально планировали');
});

