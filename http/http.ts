import axios from 'axios';

const http = axios.create({
    baseURL:'https://hn.algolia.com/api/v1/'
});

export default http;