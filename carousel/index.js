const slides = document.querySelectorAll('.carousel__item');
let slidePosition = 0;
const totalSlides = slides.length;

document.getElementById('carousel-button-next').addEventListener('click', moveToNextSlide);
document.getElementById('carousel-button-prev').addEventListener('click', moveToPrevSlide);

const slidesListEl =  document.querySelector('.slide-list');

slides.forEach((el, i) => {
    slidesListEl.innerHTML +=
    `
        <button class="slide-list-btn" data-slide-index="${i}" aria-label="Change to slide ${i}"></button>
    `
})

const slideListBtns = document.querySelectorAll(".slide-list-btn");

slideListBtns.forEach(el => {
    el.addEventListener("click", () => {
        let index = parseInt(el.dataset.slideIndex);
        changeSlide(index);
    })
});

// Render the buttons for changing the slides under the carousel
function renderSlideList() {

    for (let slideBtn of slideListBtns) {
        slideBtn.style.backgroundColor = 'var(--clr-carousel-action-btn-inactive)';
    }

    slideListBtns[slidePosition].style.backgroundColor = 'var(--clr-carousel-action-btn-active)';
}

// Function for the slide changing buttons under the carousel
function changeSlide(slideIndex) {
    hideAllSlides();

    slides[slideIndex].classList.add("carousel__item--visible");
    slidePosition = slideIndex;

    renderSlideList()
}

// Function to reset the modifier classes of all carousel items, which is called on every slide change
function hideAllSlides() {
    slides.forEach((el) => {
        el.classList.remove('carousel__item--visible');
        el.classList.add('carousel__item--hidden');
    })
}

function moveToNextSlide() {
    hideAllSlides();
    
    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    
    slides[slidePosition].classList.add("carousel__item--visible");
    renderSlideList()
}

function moveToPrevSlide() {
    hideAllSlides();
    
    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }
    
    slides[slidePosition].classList.add("carousel__item--visible");
    renderSlideList()
}

renderSlideList()

// setInterval(() => {
//     moveToNextSlide();
// },5000)
