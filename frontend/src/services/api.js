import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333' // default em todas as chamadas

})

export default api;