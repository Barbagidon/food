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