"use strict";

document.addEventListener('DOMContentLoaded', function(){

    const tabsContent = document.querySelectorAll('.tabcontent'),
          tabParent = document.querySelector('.tabheader__items'),
          tabButtonClass = document.querySelectorAll('.tabheader__item');

          function hideTabContent() {
              tabsContent.forEach(item => {
                item.style.display = 'none';
              });
          }

    hideTabContent();







});