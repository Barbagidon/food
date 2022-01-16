function tabs(container, tabsSelector, tabsContent, contContainer, activeClass) {
    const tabsContainer = document.querySelector(container),
        tabs = document.querySelectorAll(tabsSelector),
        content = document.querySelectorAll(tabsContent),
        contentContainer = document.querySelector(contContainer);


    function hideTabContent() {
        tabs.forEach(item => {
            item.classList.remove(activeClass);

        });

        content.forEach(item => {
            item.classList.remove('add', 'fade');
            item.classList.add('hide');

        });
    }

    function showTabContent(i = 0) {
        tabs[i].classList.add(activeClass);
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

export default tabs;