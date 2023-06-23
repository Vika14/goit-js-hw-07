import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);
console.log(basicLightbox);


const gallery = document.querySelector('.gallery');


function createMarkupItems(arr) {
    return arr.map(({ preview, original, description }) => 
    `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`).join('')
}
gallery.insertAdjacentHTML('afterbegin', createMarkupItems(galleryItems));
gallery.addEventListener('click', handlerClickImg);

function handlerClickImg(e) {
    e.preventDefault();
    if (e.target.classList.contains("gallery__item")) {
        return;
    }

    const instance = basicLightbox.create(
        `<img src="${e.target.dataset.source}" alt="${e.target.description}" 
        width="1300" height="900" data-source="${e.target.dataset.source}">`, {
        onShow: handlerEscapeModal,
        onClose: handlerEscapeModal,
    });
    instance.show();
}

function handlerEscapeModal(e) {
    if (e.code === "Escape") {
        instance.close();
    }
}

window.addEventListener("keydown", handlerEscapeModal);
window.removeEventListener("keydown", handlerEscapeModal);

