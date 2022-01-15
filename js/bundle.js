/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((module) => {

function calc(){
    let sex, weight, height, age, ratio;
    const active = 'calculating__choose-item_active';
    const female = document.querySelector('#female');
    const male = document.querySelector('#male');

    let result = document.querySelector('.calculating__result span');
    result.textContent = 0;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }if(localStorage.getItem('ratio')){
        ratio= localStorage.getItem('ratio');
    }else{
        ratio = 1.375;

    }


    function formula() {
        if (sex == 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);

        }
        if (sex == 'male') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
        if (!sex || !weight || !age || !height || !ratio) {
            result.textContent = '0';
        }
    }

    function addRemoveClass(addItem, removeItem) {
        addItem.classList.add(active);
        removeItem.classList.remove(active);

    }

    function addValue() {
        if (localStorage.getItem('sex') == 'male') {
            addRemoveClass(male, female);
            

        } else {
            addRemoveClass(female, male);
        }
        if (localStorage.getItem('ratio')) {
            const forms = document.querySelectorAll('[data-active]');
            forms.forEach(item => {
                item.classList.remove(active);
                if (item.getAttribute('data-active') == localStorage.getItem('ratio')) {
                    item.classList.add(active);
                    
                }
            });
        }

    }

    addValue();

    console.log(localStorage.getItem('sex'));

    function getValue(item) {
        item = document.querySelectorAll(item);


        item.forEach(form => {

            form.addEventListener('input', () => {
                if (form.value.match(/\D/)) {
                    form.style.border = '1px solid red';
                } else {
                    form.style.border = 'none';
                }
                if (form.id == 'height') {
                    height = +form.value;
                }
                if (form.id == 'weight') {
                    weight = +form.value;
                }
                if (form.id == 'age') {
                    age = +form.value;
                    console.log(form.value);
                }

                formula();
            });

        });
    }


    function activeClass(item) {
        item = document.querySelector(item);

        item.addEventListener('click', (e) => {

            if (e.target == document.querySelector('#female')) {
                sex = 'female';
                addRemoveClass(e.target, male);

            }
            if (e.target == document.querySelector('#male')) {
                sex = 'male';
                addRemoveClass(e.target, female);
            }
            if (e.target.getAttribute('data-active')) {
                ratio = +e.target.getAttribute('data-active');
                document.querySelectorAll('.calculating__choose_big div').forEach(el => {
                    el.classList.remove(active);
                });
                e.target.classList.add(active);
                console.log(ratio);
            }
            localStorage.setItem('sex', sex);
            localStorage.setItem('ratio', ratio);
            formula();
        });
    }

    activeClass('#female');
    activeClass('#male');
    activeClass('.calculating__choose_big');
    getValue('.calculating__choose_medium input');


}

module.exports = calc;

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((module) => {

function cards() {
    class Card {
        constructor(place, src, title, descr, price, ...classes) {
            this.src = src;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.place = document.querySelector(place);
            this.transfer = 2.7;
            this.classes = classes;
            this.change();
        }



        change() {
            this.price += (this.price * this.transfer).toFixed(2);
        }




        addElement() {
            const element = document.createElement('div');

            if (this.classes.length < 1) {
                element.classList.add('menu__item');
            } else {
                this.classes.forEach(item => {
                    element.classList.add(item);
                });
            }

            element.innerHTML += `
            <img src="${this.src}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
            `;
            this.place.append(element);


        }
    }

    const getResource = async (url) => {
        const f = await fetch(url);
        if (!f.ok) {
            throw new Error(`Ошибка ${f.status}`);
        }
        return await f.json();
    };

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                title,
                descr,
                price
            }) => {
                new Card('.menu__field .container', img, title, descr, price).addElement();
            });
        });

}

module.exports = cards;

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((module) => {

function forms() {
    const forms = document.querySelectorAll('form');

    const messages = {
        ok: 'Спс, бро',
        wrong: 'Все сломалось, бро',
    };

    forms.forEach(form => {
        bindPostData(form);

    });


    const postData = async (url, data) => {
        let res = await fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json'
            }
        }, );


        return res.json();
    };



    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const spiner = document.createElement('img');
            spiner.src = 'img/form/spinner.svg';
            spiner.style.cssText =
                'display: block; margin: 0 auto;';
            form.insertAdjacentElement('afterend', spiner);

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => {
                    spiner.remove();
                    console.log(data);
                    showHello(messages.ok);
                }).catch(() => {
                    showHello(messages.wrong);

                }).finally(() => {
                    form.reset();
                });

        });
    }


    function showHello(message) {
        const prevModal = document.querySelector('.modal__content');
        prevModal.classList.add('hide');
        showModal();

        const newMessage = document.createElement('div');
        newMessage.classList.add('modal__content');
        newMessage.innerHTML = `
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
        `;

        document.querySelector('.modal__dialog').append(newMessage);


        setTimeout(() => {
            prevModal.classList.remove('hide');
            prevModal.classList.add('show');
            newMessage.remove();
            closeModal(modal);

        }, 2000);
    }

    


}

module.exports = forms;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((module) => {

function modal() {
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');


    modalTrigger.forEach(item => {
        item.addEventListener('click', (e) => {
            showModal();
            document.body.style.overflow = 'hidden';
        });


    });



    modal.addEventListener('click', (e) => {
        const target = e.target;

        if (target === modal || target.getAttribute('data-close') === '') {
            closeModal(modal);
            document.body.style.overflow = '';
        }

    });

    function showModal() {
        modal.classList.remove('hide');
        modal.classList.add('show', );
        // clearInterval(timerId);

    }

    function closeModal(modal) {
        modal.classList.add('hide');
        modal.classList.remove('show');
    }

    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape" && modal.classList.contains('show')) {
            closeModal(modal);
            console.log(1);

        }
    });

    // const timerId = setTimeout(showModal, 30000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);

        }


    }

    // window.addEventListener('scroll', showModalByScroll);
}

module.exports = modal;

/***/ }),

/***/ "./js/modules/slide.js":
/*!*****************************!*\
  !*** ./js/modules/slide.js ***!
  \*****************************/
/***/ ((module) => {

function slide() {
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector('.offer__slider');


    let slideIndex = 1;
    let offset = 0;
    slidesField.style.width = +width.replace(/px/, '') * slides.length + `px`;
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slidesWrapper.style.overflow = 'hidden';

    if (slides.length < 10) {
        total.textContent = '0' + slides.length;

    } else {
        total.textContent = slides.length;
    }

    slides.forEach(item => {
        item.style.width = width;
    });

    function currentText() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }

    }
    currentText();



    function nextSlide() {
        offset += +width.replace(/px/, '');
        if (offset == +width.replace(/px/, '') * (slides.length)) {
            offset = 0;
        }

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        currentText();



        slidesField.style.transform = `translateX(-${offset}px)`;
        dotsOpacity();
        dots[slideIndex - 1].style.opacity = 1;

    }



    function prevSlide() {
        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;

        }

        currentText();

        if (offset == 0) {
            offset = +width.replace(/px/, '') * (slides.length - 1);
        } else {
            offset -= +width.replace(/px/, '');
        }
        dotsOpacity();

        dots[slideIndex - 1].style.opacity = 1;
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    function dotsOpacity() {
        dots.forEach(item => {
            item.style.opacity = 0.5;
        });

    }



    prev.addEventListener('click', prevSlide);
    next.addEventListener('click', nextSlide);


    const dotsWrapper = document.createElement('div');

    slider.style.position = 'relative';
    dotsWrapper.classList.add('carousel-indicators');
    slider.append(dotsWrapper);
    let dots = [];
    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement('div');
        dot.setAttribute('number', i + 1);
        dot.classList.add('dot');
        dotsWrapper.append(dot);
        if (i == 0) {
            dot.style.opacity = 1;
        }

        dots.push(dot);

    }

    dots.forEach(item => {
        item.addEventListener('click', (e) => {
            let number = e.target.getAttribute('number');
            slideIndex = number;
            offset = +width.replace(/px/, '') * (number - 1);
            slidesField.style.transform = `translateX(-${offset}px)`;
            currentText();
            dotsOpacity();
            e.target.style.opacity = 1;

        });

    });
}

module.exports = slide;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabsContainer = document.querySelector('.tabheader__items'),
        tabs = document.querySelectorAll('.tabheader__item'),
        content = document.querySelectorAll('.tabcontent'),
        contentContainer = document.querySelector('.tabcontainer');


    function hideTabContent() {
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');

        });

        content.forEach(item => {
            item.classList.remove('add', 'fade');
            item.classList.add('hide');

        });
    }

    function showTabContent(i = 0) {
        tabs[i].classList.add('tabheader__item_active');
        content[i].classList.add('show', 'fade');
        content[i].classList.remove('hide');

    }

    tabsContainer.addEventListener('click', (e) => {
        const target = e.target;
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);

            }

        });


    });
    hideTabContent();
    showTabContent();

}

module.exports = tabs;

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    const deadline = '2022-01-20'; ///дата конца акции


    function addZero(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }

    }


    function getTimeRemaining(endtime) {
        ///преобразовываем дедлайн к мс
        ///И отнимаем от него текущую дату
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))), ///переводим мс в дни
            hours = Math.floor((t / (1000 * 60 * 60) % 24)), // в часы
            minutes = Math.floor((t / 1000 / 60) % 60), ///минуты
            seconds = Math.floor((t / 1000) % 60); /// секунды

        return { ///возвращаем данные для дальнейшего использования
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };

    }


    function setClock(endtime, selector) {
        const timer = document.querySelector('.timer'),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');


        setTime();




        function setTime() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = addZero(t.days);
            hours.innerHTML = addZero(t.hours);
            minutes.innerHTML = addZero(t.minutes);
            seconds.innerHTML = addZero(t.seconds);

            setTimeout(setTime, 1000);

        }

    }

    setClock(deadline, '.timer');


    

   
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', () => {
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js"),
          modal = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js"),
          timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js"),
          cards = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js"),
          calc = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js"),
          forms = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js"),
          slide = __webpack_require__(/*! ./modules/slide */ "./js/modules/slide.js");

    tabs();
    modal();
    timer();
    cards();
    calc();
    forms();
    slide();
    
  





   






});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map