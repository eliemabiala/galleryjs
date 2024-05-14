console.log('📸 galleryApp')

// DOM 
const monImage = document.querySelector('#monImage')
const [btnPrev, btnPlay, btnNext] = document.querySelectorAll('div.buttons-container > button')
const thumbnailsParent = document.querySelector('.thumbnails-container')
const IMAGES_FOLDER = './static/img/wide/'
const THUMB_FOLDER  = './static/img/thumbnails/'
// DataSet 
const images = [
    "gaby1.jpg",
    "gaby2.jpg",
    "hiroshima.jpg",
    "iceland1.jpg",
    "iceland2.jpg",
    "japan1.jpg",
    "jerusalem.jpg",
    "jocelyn.jpg",
    "lost.jpg",
    "sifnos.jpg" // idx 9
]

let compteur = 0
let maxIndex = images.length - 1

// ?? quel est la valeur max de mon compteur ? 

const nextImage = () => {
    compteur < maxIndex ? compteur++ : compteur = 0;
    // Remove border color from current thumbnail
    clearAllThumbnails();
    // Apply border color to the next thumbnail
    const nextThumbnail = thumbnailsParent.querySelectorAll('div > img')[compteur];
    nextThumbnail.classList.add('thumbnails-current');
    // Update the main image
    updateImage();
}

const prevImage = () => {
    if (compteur > 0) {
        compteur--;
    } else {
        compteur = maxIndex;
    }
    // Remove border color from current thumbnail
    clearAllThumbnails();
    // Apply border color to the previous thumbnail
    const prevThumbnail = thumbnailsParent.querySelectorAll('div > img')[compteur];
    prevThumbnail.classList.add('thumbnails-current');
    // Update the main image
    updateImage();
}

function updateImage() {
    monImage.src = IMAGES_FOLDER + images[compteur];
}

let monInterval = 0

function startDiaporama() {
    if (monInterval) {
        clearInterval(monInterval);
        btnPlay.textContent = '▶';
        monInterval = 0;
    } else {
        btnPlay.textContent = '⏸';
        monInterval = setInterval(nextImage, 5000);
    }

}

btnNext.addEventListener('click', nextImage);
btnPrev.addEventListener('click', prevImage);
btnPlay.addEventListener('click', startDiaporama);

console.log(window);

function createThumbnails() {
    images.forEach((thumbnail, idx) => {
        const divTest = document.createElement('div');
        const thumbnailImg = document.createElement('img');
        divTest.appendChild(thumbnailImg);
        thumbnailsParent.appendChild(divTest);
        thumbnailImg.src = THUMB_FOLDER + thumbnail;

        thumbnailImg.addEventListener('click', () => {
            compteur = idx;
            updateImage();
            clearAllThumbnails();
            thumbnailImg.classList.add('thumbnails-current');
        });

    });
}

function clearAllThumbnails() {
    const parentThumbnail = document.querySelector('.thumbnails-container');
    const allThumbnails = parentThumbnail.querySelectorAll('div > img');

    allThumbnails.forEach((vignette) => {
        vignette.classList.remove('thumbnails-current');
    });
}

createThumbnails();
