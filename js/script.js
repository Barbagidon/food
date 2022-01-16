import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slide from './modules/slide';
import {
    showModal
} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {

    const timerId = setTimeout(() => showModal('.modal', timerId), 3000);
    tabs('.tabheader__items', '.tabheader__item', '.tabcontent', '.tabcontainer', 'tabheader__item_active');
    modal('[data-modal]', '.modal', timerId);
    timer('.timer', '2022-01-20');
    cards();
    calc();
    forms('form');
    slide({
        sliderSelect: '.offer__slider',
        slideSelect: '.offer__slide',
        prevSelect: '.offer__slider-prev',
        nextSelect: '.offer__slider-next',
        totalSelect: '#total',
        currentSelect: '#current',
        wrapperSelect: '.offer__slider-wrapper',
        fieldSelect: '.offer__slider-inner',

    });

});