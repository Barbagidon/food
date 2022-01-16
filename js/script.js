import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slide from './modules/slide';
import {showModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {

    const timerId = setTimeout(() => showModal('.modal', timerId), 3000);
    tabs();
    modal('[data-modal]', '.modal', timerId);
    timer();
    cards();
    calc();
    forms();
    slide();

});