// You can add interactive scripts here later.
// For example: a popup image viewer or slideshow feature.
console.log("Gallery page loaded successfully!");
// Select all gallery images
const galleryImages = document.querySelectorAll('.gallery-item img');

// Get lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const captionText = document.getElementById('caption-text');
const closeBtn = document.querySelector('.close');

// Show Lightbox when image is clicked
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
    captionText.textContent = img.alt; // Use the image's alt text as caption
  });
});

// Close Lightbox when X is clicked
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Close Lightbox when background is clicked
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
