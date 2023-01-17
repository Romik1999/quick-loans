document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.reviews-slider', {
        slidesPerView: 4,
        spaceBetween: 20,

        navigation: {
            nextEl: '.reviews__arrow--next',
            prevEl: '.reviews__arrow--prev',
        },

        breakpoints: {
            300: {
                slidesPerView: 1,
            },
            575: {
                slidesPerView: 2,
            },
            991: {
                slidesPerView: 3,
            },
            1440: {
                slidesPerView: 4,
            },
        },
    });


// range
const sumInput = document.querySelector('.form__input--range'),
    rangeInputSum = document.querySelector('.range__input'),
    rangeTrackSum = document.querySelector('.range__fill'),
    rangeTrackHandler = document.querySelector('.range__handler');

sumInput.value = sumInput.value.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' Р'

// маска
function prettify(num) {
    const n = num.toString();
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ') + ' Р';
}

function range(input$, progress$, content) {
    if (input$) {
        const val = input$.value;
        const min = input$.getAttribute('min');
        const max = input$.getAttribute('max');
        const step = input$.getAttribute('step');
        const position = 100 / (max - step) * (val - step);
        updateRangePosition(progress$, position);

        input$.addEventListener('input', () => {
            const val = input$.value;
        const min = input$.getAttribute('min');
        const max = input$.getAttribute('max');
        const step = input$.getAttribute('step');
        const position = 100 / (max - step) * (val - step);
        updateRangePosition(progress$, position);
        content.value = prettify(val);
    });
    }
}

function updateRangePosition(progress$, position) {
    if (progress$) {
        progress$.style.width = `${position}%`;
    }
}

range(rangeInputSum, rangeTrackSum, sumInput);


sumInput.addEventListener('input', function () {

    const minSum = rangeInputSum.getAttribute('min');
    const maxSum = rangeInputSum.getAttribute('max');
    const stepSum = rangeInputSum.getAttribute('step');

    this.value = prettify(this.value.replace(/\D/g, ''))
    if (+this.value.replace(/\D/g, '') > +maxSum) {
        this.value = prettify(maxSum)
        return
    }
    if (+this.value.replace(/\D/g, '') < +minSum) {
        rangeInputSum.value = 0
        rangeTrackSum.style.width = 0 + '%'
        return
    }
    if (+this.value.replace(/\D/g, '') >= +minSum && +this.value.replace(/\D/g, '') <= +maxSum) {
        rangeTrackSum.style.width = `${100 / (maxSum - stepSum) * (this.value.replace(/\D/g, '') - stepSum)}%`;
        rangeInputSum.value = this.value.replace(/\D/g, '')
    }
})




// функция для модалки

function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scarollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scarollWidth;
}

let scrollWidth = calcScroll();

function modal(modal, modalActiveClass, triggers, modalClose) {
    const triggers_ = document.querySelectorAll(triggers),
        modal_ = document.querySelector(modal),
        modalClose_ = document.querySelector(modalClose);

    if (triggers_.length > 0) {
        triggers_.forEach(item => {
            item.addEventListener('click', () => {
                modal_.classList.add(modalActiveClass);
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scrollWidth}px`;
    });
    });

        modalClose_.addEventListener('click', () => {
            modal_.classList.remove(modalActiveClass);
        document.body.style.overflow = '';
        document.body.style.marginRight = '0px';
    });

        modal_.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__container')) {
            modal_.classList.remove(modalActiveClass);
            document.body.style.overflow = '';
            document.body.style.marginRight = '0px';
        }
    });
    }
}

modal('.modal-main', 'modal--active', '[data-modal="main"]', '.modal-main__close');
modal('.modal-reviews', 'modal--active', '[data-modal="reviews"]', '.modal-reviews__close');

})
