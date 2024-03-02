import axios from 'axios';

export default axios.create({
    baseURL: 'https://assg-2.onrender.com/',
    headers: {
        'Content-type': 'application/json'
    }
}); 