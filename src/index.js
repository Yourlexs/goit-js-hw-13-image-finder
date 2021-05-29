import './sass/main.scss';
import imagesTpl from './templates/images.hbs';
import ImagesApiService from './js/apiService';
import LoadMoreBtn from './js/load-more-btn.js';
import error from './js/pnotify';

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
}

function appendImagesMarkup(images) {
    refs.gallery.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}