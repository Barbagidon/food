import {getResource} from '../services/services';


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

export default cards;