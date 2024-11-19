document.addEventListener('DOMContentLoaded', () => {
    const slideshowElement = document.getElementById('slideshow');

    fetch('images.json')
        .then(response => response.json())
        .then(data => {
            let currentIndex = 0;
            const images = data.images;

            function showNextImage() {
                currentIndex = (currentIndex + 1) % images.length;
                slideshowElement.src = images[currentIndex];
            }

            setInterval(showNextImage, 3000);
        })
        .catch(error => {
            console.error('Eroare la preluarea imaginilor:', error);
        });
});
