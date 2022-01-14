if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s  all';
slidesWrapper.style.overflow = 'hidden';

slides.forEach(item => {
    item.style.width = width;
});
console.log(slideIndex);
next.addEventListener('click', () => {
    if (offset == +width.replace(/px/, '') * (slides.length - 1)) {
        offset = 0;

    } else {
        offset += +width.replace(/px/, '');
    }
    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }




    slidesField.style.transform = `translateX(-${offset}px)`;
});

prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = +width.replace(/px/, '') * (slides.length - 1);

    } else {
        offset -= +width.replace(/px/, '');
    }
    console.log(slideIndex);

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }
    if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
});