let currentIndex = 0;
const images = document.querySelectorAll(".carousel-img");
const dotsContainer = document.querySelector(".carousel-dots");

function showSlide(index) {
  images.forEach((img, i) => img.classList.remove("active"));
  images[index].classList.add("active");

  updateDots();
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % images.length; 
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + images.length) % images.length; 
  showSlide(currentIndex);
}

function createDots() {
  for (let i = 0; i < images.length; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => {
      currentIndex = i;
      showSlide(currentIndex);
    });
    dotsContainer.appendChild(dot);
  }
  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

createDots();
showSlide(currentIndex); 
setInterval(nextSlide, 5000); 