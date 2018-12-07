import * as axios from 'axios';

const instance = axios.create();
// instance.defaults.baseURL = 'http://138.197.86.31:10000/';
instance.defaults.baseURL = 'http://192.168.0.5:8000/';


export { instance as default };
