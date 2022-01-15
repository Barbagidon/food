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