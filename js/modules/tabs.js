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