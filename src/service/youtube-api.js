import axios from 'axios';
const KEY = 'AIzaSyCm4XEp1AN9YySedPYDY6M4nuwFMUf7OVY';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3/',
    params: {
        part: 'snippet',
        maxResults: 5,
        key: KEY
    }
})