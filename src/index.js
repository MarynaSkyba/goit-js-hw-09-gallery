import './sass/main.scss';


import images from './gallery-items.js';


function createGallery(images) {
  return images.map(({preview, original, description}) => {
    return `
    <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
  >
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`
    }).join('');
    };
  
    
  const mainGallery = document.querySelector('.js-gallery');
  const imageMarkup =  createGallery(images);
  mainGallery.insertAdjacentHTML('beforeend', imageMarkup);

  const openModal = document.querySelector('.js-lightbox')
  const changeScrImage = document.querySelector('.lightbox__image')
  
  mainGallery.addEventListener('click', onImageClick)

  function onImageClick (event) {
    event.preventDefault();

    const galleryTarget = event.target.classList.contains('gallery__item')
    if (!galleryTarget){
 
 openModal.classList.add('is-open');
 changeScrImage.src = event.target.dataset.source;
 changeScrImage.alt = event.target.alt;

 window.addEventListener('keydown', onEscBtnClick);
  }};

  const closeModalBtn = document.querySelector('[data-action="close-lightbox"]');

 closeModalBtn.addEventListener('click', onCloseModalBtn)
    function onCloseModalBtn () {
    openModal.classList.remove('is-open');
    changeScrImage.src = '';
    changeScrImage.alt = '';

    window.removeEventListener('keydown', onEscBtnClick);

  };



//дополнительно


const backdrop = document.querySelector('.lightbox__overlay');
backdrop.addEventListener('click', onBackdropClick)
function onBackdropClick (event) {
  if(event.currentTarget === event.target){
    onCloseModalBtn();
  }
}

function onEscBtnClick(event) {
    if (event.code === 'Escape') {
      onCloseModalBtn();}
    };





    window.addEventListener('keydown', switchImages);

    const arrayImg = images.map((item) => item.original); 
        
    function switchImages(evt) {        
        let index = arrayImg.indexOf(changeScrImage.src );
        
        if (evt.code === 'ArrowRight') {
            if (index < arrayImg.length - 1) {
                changeScrImage.setAttribute("src", arrayImg[index + 1]);
            } else {
                index = -1;
                changeScrImage.setAttribute("src", arrayImg[index + 1]);
            }
        }
        if (evt.code === 'ArrowLeft') {
            if (index === 0) {
                index = arrayImg.length;
                changeScrImage.setAttribute("src", arrayImg[index - 1]);
            } else changeScrImage.setAttribute("src", arrayImg[index - 1]);
        }
    }