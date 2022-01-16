function showModal(modalSelector, timerId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('hide');
    modal.classList.add('show');
    if (timerId) {
        clearInterval(timerId);
    }


}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
}

function modal(triggerSelector, modalSelector, timerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);

    modalTrigger.forEach(item => {
        item.addEventListener('click', (e) => {
            showModal(modalSelector, timerId);
            document.body.style.overflow = 'hidden';
        });


    });





    modal.addEventListener('click', (e) => {
        const target = e.target;

        if (target === modal || target.getAttribute('data-close') === '') {
            closeModal(modalSelector);
            document.body.style.overflow = '';
        }

    });



    document.addEventListener('keydown', (e) => {
        if (e.code == "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
            console.log(1);

        }
    });

    

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModal();
            window.removeEventListener('scroll', showModalByScroll);

        }


    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {
    closeModal
};
export {
    showModal
};