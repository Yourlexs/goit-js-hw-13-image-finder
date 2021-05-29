import './sass/main.scss';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import imagesTpl from './templates/images.hbs';
import ImagesApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn.js';
import error from './js/pnotify';
import * as basicLightbox from 'basiclightbox';

var debounce = require('lodash.debounce');

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
}

const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});

const imageApiService = new ImagesApiService();

refs.searchForm.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchImages);
refs.gallery.addEventListener('click',onOpenModal)

function onSearch(e) {
    e.preventDefault();

    imageApiService.query = e.target.value;

    if (imageApiService.query === ' ') {
        error('Oops...')
    }

    loadMoreBtn.show();
    imageApiService.resetPage();
    clearGallery();
    fetchImages()
}

async function fetchImages() {
    loadMoreBtn.disable();
    
    const images = await imageApiService.fetchImages();
    appendImagesMarkup(images);
    loadMoreBtn.enable();

    loadMoreBtn.refs.button.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function appendImagesMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

function onOpenModal(e) {
    const isElImg = e.target.classList.contains('gallery-image');
    if (!isElImg) {
        return;
    }
    const instance = basicLightbox.create(`<img src="${e.target.dataset.source}">`);
    instance.show();
};
