const API_KEY = '21843177-dc493b9de0e38d6cc05d61e8e';
const BASE_URL = 'https://pixabay.com/api/';

export default class ImagesApiService {

    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages() {
        try {
            const response = await fetch(`${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`);
            const pictures = await response.json();
            
            this.incrementPage();
            return pictures.hits;

        } catch (error) {
            console.log(error);
        }
    }
    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}