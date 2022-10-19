const slides = document.getElementsByClassName('carousel-item');
let slidePosition = 0;
const totalSlides = slides.length;

document.getElementById('carousel-button-next').addEventListener('click', moveToNextSlide);
document.getElementById('carousel-button-prev').addEventListener('click', moveToPrevSlide);

const slidesListEl =  document.querySelector('.slide-list');

// for (let i = 0; i < totalSlides; i++) {
//     slidesListEl.innerHTML +=
//     `
//         <button class="slide-list-btn" onclick="changeSlide(${i})"></button>
//     `
// }

for (let i = 0; i < totalSlides; i++) {
    slidesListEl.innerHTML +=
    `
        <button class="slide-list-btn" data-slideIndex="${i}"></button>
    `
}

const slideListBtns = document.querySelectorAll(".slide-list-btn");

slideListBtns.forEach(button => {
    button.addEventListener("click", () => {
        let index = parseInt(button.getAttribute("data-slideIndex"));
        changeSlide(index);
    })
});


function renderSlideList() {
    const activeColor = "#f7f7f790";
    const nonActiveColor = "#33333380";

    for (let slideBtn of slideListBtns) {
        slideBtn.style.backgroundColor = nonActiveColor;
    }

    slideListBtns[slidePosition].style.backgroundColor = activeColor;
}

renderSlideList()

function changeSlide(slideIndex) {
    hideAllSlides();

    slides[slideIndex].classList.add("carousel-item-visible");
    slidePosition = slideIndex;

    renderSlideList()
}

function hideAllSlides() {
    for (let slide of slides) {
        slide.classList.remove('carousel-item-visible');
        slide.classList.add('carousel-item-hidden');
    }
}

function moveToNextSlide() {
    hideAllSlides();
    
    if (slidePosition === totalSlides - 1) {
        slidePosition = 0;
    } else {
        slidePosition++;
    }
    
    slides[slidePosition].classList.add("carousel-item-visible");
    renderSlideList()
}

function moveToPrevSlide() {
    hideAllSlides();
    
    if (slidePosition === 0) {
        slidePosition = totalSlides - 1;
    } else {
        slidePosition--;
    }
    
    slides[slidePosition].classList.add("carousel-item-visible");
    renderSlideList()
}

// setInterval(() => {
//     moveToNextSlide();
// },5000)
