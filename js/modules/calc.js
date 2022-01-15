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