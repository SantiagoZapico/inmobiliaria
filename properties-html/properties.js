document.addEventListener('DOMContentLoaded', () => {
    const currentImage = document.getElementById('current-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const leftArrow = document.createElement('button');
    const rightArrow = document.createElement('button');

    // Configuración de las flechas
    leftArrow.classList.add('nav-arrow', 'left');
    leftArrow.innerHTML = '&#10094;'; // Símbolo de flecha izquierda
    rightArrow.classList.add('nav-arrow', 'right');
    rightArrow.innerHTML = '&#10095;'; // Símbolo de flecha derecha

    document.querySelector('.thumbnail-images').appendChild(leftArrow);
    document.querySelector('.thumbnail-images').appendChild(rightArrow);

    // Funcionalidad de flechas
    leftArrow.addEventListener('click', () => {
        thumbnailContainer.scrollBy({ left: -150, behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
        thumbnailContainer.scrollBy({ left: 150, behavior: 'smooth' });
    });

    // Cambio de imagen principal sin duplicación en miniaturas
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            const newMainSrc = this.dataset.large; // Nueva imagen principal
            const currentSrc = currentImage.src;   // Imagen principal actual

            // Evitar que la miniatura seleccionada se duplique
            if (newMainSrc !== currentSrc) {
                currentImage.style.opacity = 0;

                setTimeout(() => {
                    currentImage.src = newMainSrc;
                    currentImage.style.opacity = 1;
                }, 500);

                thumbnails.forEach(img => img.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const mainImage = document.getElementById("current-image");
    const thumbnails = document.querySelectorAll(".thumbnail");
    const modal = new bootstrap.Modal(document.getElementById("imageModal"));
    const modalImage = document.getElementById("modalImage");
    let currentIndex = 0;

    function updateModalImage(index) {
        const selectedThumbnail = thumbnails[index];
        const largeImageSrc = selectedThumbnail.getAttribute("data-large");
        modalImage.setAttribute("src", largeImageSrc);
    }

    mainImage.addEventListener("click", function() {
        modal.show();
        updateModalImage(currentIndex);
    });

    document.getElementById("prevImage").addEventListener("click", function() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = thumbnails.length - 1;
        }
        updateModalImage(currentIndex);
    });

    document.getElementById("nextImage").addEventListener("click", function() {
        if (currentIndex < thumbnails.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateModalImage(currentIndex);
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", function() {
            currentIndex = index;
            updateModalImage(currentIndex);
        });
    });
});
