import axios from "axios";


axios.defaults.baseURL = 'http://localhost:3000/api/';
axios.defaults.headers.common['authorization'] = 'Bearer' + localStorage.getItem('GPMANIA_token');

   