// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxVideo = document.getElementById('lightbox-video');
const captionText = document.getElementById('caption-text');
const closeBtn = document.querySelector('.lightbox .close');

document.querySelectorAll('.video-item video').forEach(video => {
  video.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxVideo.src = video.src;
    captionText.textContent = video.nextElementSibling.textContent;
    lightboxVideo.play();
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
  lightboxVideo.pause();
  lightboxVideo.src = '';  // clear source so it stops playing
});

window.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    lightboxVideo.pause();
    lightboxVideo.src = '';
  }
});
