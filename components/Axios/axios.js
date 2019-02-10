import * as axios from 'axios';

const instance = axios.create();
instance.defaults.baseURL = 'http://misegurovirtual.com/';
// instance.defaults.baseURL = 'http://192.168.0.7:8000/';


export { instance as default };
