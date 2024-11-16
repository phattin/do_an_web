// document.addEventListener("DOMContentLoaded", () => {
// const slideImg=document.querySelector("#Slideshow-container");
// let currentSlide=0;
// const lengthSlide=slideImg.children.length;
// const slideShow=setInterval(()=>{
//     currentSlide++;
//     if(currentSlide===lengthSlide)
//         currentSlide=0;
//     slideImg.style.transform='translateX(${100*-1*currentSlide}%)';
// },2000);
// });
// let currentIndex = 0;
// const slides = document.querySelectorAll('.Slideshow img');
// const totalSlides = slides.length;

// // Hiển thị slide đầu tiên
// slides[currentIndex].classList.add('active');

// // Hàm chuyển slide
// function showSlide(index) {
//     slides.forEach((slide, i) => {
//         slide.classList.remove('active');
//         if (i === index) {
//             slide.classList.add('active');
//         }
//     });
// }

// // Tự động chuyển slide mỗi 3 giây
// setInterval(() => {
//     currentIndex = (currentIndex + 1) % totalSlides; // Cập nhật chỉ số
//     showSlide(currentIndex);
// }, 3000);



document.addEventListener("DOMContentLoaded", () => {
    const slideImg = document.querySelector("#Slideshow-container .Slideshow");
    let currentSlide = 0;
    const lengthSlide = slideImg.children.length;

    const slideShow = setInterval(() => {
        currentSlide++;
        if (currentSlide === lengthSlide) {
            currentSlide = 0;
        }
        slideImg.style.transform = `translateX(${-100 * currentSlide}%)`;
    }, 3000);
});
