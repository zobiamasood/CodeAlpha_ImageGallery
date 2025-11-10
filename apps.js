let currentFilter = "all";
let lightbox = document.getElementById("lightbox");
let lightboxImg = document.getElementById("lightbox-img");
let currentIndex = 0;

// Dark mode toggle
function darkMode() {
  document.body.classList.toggle("dark");
}

// Filtering image
function filterImages(category) {
  currentFilter = category;
  const imgs = document.querySelectorAll(".images img");

  imgs.forEach(img => {
    const imgCategory = img.getAttribute("data-category");
    if (category === "all" || imgCategory === category) {
      img.classList.remove("hidden");
    } else {
      img.classList.add("hidden");
    }
  });

  updateClickEvents();
}

// Get currently visible images
function getFilteredImages() {
  return [...document.querySelectorAll(".images img:not(.hidden)")];
}

// Add click event to visible images
function updateClickEvents() {
  document.querySelectorAll(".images img:not(.hidden)").forEach((img, index) => {
    img.onclick = () => {
      const imgs = getFilteredImages();
      currentIndex = imgs.indexOf(img);
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    };
  });
}

// Lightbox controls
function closeLightbox() { lightbox.style.display = "none"; }
function Next() {
  const imgs = getFilteredImages();
  currentIndex = (currentIndex + 1) % imgs.length;
  lightboxImg.src = imgs[currentIndex].src;
}
function Previous() {
  const imgs = getFilteredImages();
  currentIndex = (currentIndex - 1 + imgs.length) % imgs.length;
  lightboxImg.src = imgs[currentIndex].src;
}

// Initialize gallery
filterImages("all");
