"use strict";


document.addEventListener('DOMContentLoaded', function(){
//-------------------------Tabs
    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item');

          function hideTabContent() {
              tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
              });

              tabs.forEach(item => {
                  item.classList.remove('tabheader__item_active');
              });
              
          }
          function showTabContent(i = 0){
              tabsContent[i].classList.remove('hide');
              tabsContent[i].classList.add('show', 'fade');
              tabs[i].classList.add('tabheader__item_active');
          }
   
          

          hideTabContent();
          showTabContent();


          tabParent.addEventListener('click', event =>{
            const target = event.target;

            if(target && target.classList.contains('tabheader__item')){
                tabs.forEach((item, i)=>{
                    if (target == item){
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
//--------------------------Timer


    const now = new Date('2020-08-29 00:00:00');

    function getTimer(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            day = Math.floor(t/(1000*60*60*24)),
            hours = Math.floor(t/(1000*60*60)%24),
            minuet = Math.floor((t/1000/60)%60),
            second = Math.floor((t/1000)%60);

        return{
            't':t,
            'd': day,
            'h': hours,
            'm': minuet,
            's': second
        };
    }

    function zeroSet (num){
        if (num>=0 && num<10){
            return '0'+num;
        }
        else{
        return num;
        }
    }

    function setTimer(html, endtime) {
        const timer = document.querySelector(html),
                days = timer.querySelector("#days"),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                setinterval = setInterval(updateClock, 1000);
        updateClock();
        function updateClock() {
            const t = getTimer(endtime);

            days.innerHTML = zeroSet(t.d);
            hours.innerHTML = zeroSet(t.h);
            minutes.innerHTML = zeroSet(t.m);
            seconds.innerHTML = zeroSet(t.s);
            if (t.t <= 0) {
                clearInterval(setinterval);
            }
        }
    }

    setTimer('.timer', now);
//---------------------Modal

    const btn = document.querySelectorAll('[data-open]'),
        modal = document.querySelector('.modal'),
        formInput = document.querySelectorAll('input');

    function addClassShow() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimeId);
    }

    formInput.forEach((i)=>{
        i.addEventListener('focus', ()=>{
            clearInterval(modalTimeId);
        });
    });

    function deleteClassShow() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        clearInterval(deleteClassShow);
    }

    btn.forEach(btn =>{
        btn.addEventListener('click', addClassShow);
    });

    modal.addEventListener('click', (e)=>{
        if(e.target === modal||e.target.getAttribute('data-close')==''){
            deleteClassShow();
        }
    });

    document.addEventListener('keydown', (e)=>{
        if (e.code === "Escape" && modal.classList.contains('show')) {
            deleteClassShow();
        }
    });

    const modalTimeId = setTimeout(addClassShow, 10000);


    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight === document.documentElement.scrollHeight){
            addClassShow();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
//------------------------------Classes for cards

class NewCard {
    constructor(src, alt, title, descrip, price, perentSelector, ...classes){
        this.src = src;
        this.alt =alt;
        this.title = title;
        this.descrip = descrip;
        this.perentSelector = document.querySelector(perentSelector);
        this.classes = classes;
        this.transfer = 27;
        this.price = price;
        this.changeToUAH();
    }

    changeToUAH(){
        this.price = this.transfer * this.price;
    }

    render(){
        const element = document.createElement('div');
        if(this.classes.length === 0){
            this.classes = 'menu__item';
            element.classList.add(this.classes);
        }else{
            this.classes.forEach(elem=>element.classList.add(elem)); 
        }
        
        element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">Меню ${this.title}</h3>
            <div class="menu__item-descr">${this.descrip}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
        `;

        this.perentSelector.append(element);
    }
}

function newCardMenu(src, alt, title, descrip, price, perentSelector,...classes) {
    new NewCard (
        src,
        alt,
        title,
        descrip,
        price,
        perentSelector,
        ...classes
    ).render();
}
newCardMenu("img/tabs/vegy.jpg","vegy",'"Фитнес"','Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',9,".menu .container",'menu__item');
newCardMenu("img/tabs/elite.jpg","elite",'Меню “Премиум”','В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',21,".menu .container",'menu__item');
newCardMenu("img/tabs/post.jpg","post",'"Постное"','Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',14,".menu .container",'menu__item');

//-----------------Forms

const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Ваш запрос принят)',
    failure: 'Что-то пошло не так...'
};
forms.forEach(function(item){
    postData(item);
});

function postData (form){
    form.addEventListener('submit', (e)=>{
        
        e.preventDefault();

        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            margin-top: 30px;
        `;
        form.insertAdjacentElement('afterend',statusMessage);

        const r = new XMLHttpRequest();
        r.open('POST', 'server.php');
        
        const formData = new FormData(form);

        r.send(formData);

        r.addEventListener('load', ()=>{
            if(r.status === 200){
                form.reset();
                closeModal(message.success);
                statusMessage.remove();
            } else {closeModal(message.failure);statusMessage.remove();}
        });

        function closeModal (message){
            const prevModalDialog = document.querySelector('.modal__dialog');
            prevModalDialog.classList.add('hide');
            
            
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
            `;
            document.querySelector('.modal').append(thanksModal);
            addClassShow();

            setTimeout(()=>{
                prevModalDialog.classList.remove('hide');
                prevModalDialog.classList.add('show');
                thanksModal.remove();
                deleteClassShow();
            },2500);
        }
    });
}
});