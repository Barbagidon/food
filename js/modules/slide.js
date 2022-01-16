function slide({sliderSelect, slideSelect, prevSelect, nextSelect, totalSelect, currentSelect, wrapperSelect, fieldSelect}) {
    const slides = document.querySelectorAll(slideSelect),
        prev = document.querySelector(prevSelect),
        next = document.querySelector(nextSelect),
        total = document.querySelector(totalSelect),
        current = document.querySelector(currentSelect),
        slidesWrapper = document.querySelector(wrapperSelect),
        slidesField = document.querySelector(fieldSelect),
        width = window.getComputedStyle(slidesWrapper).width,
        slider = document.querySelector(sliderSelect);


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

export default slide;