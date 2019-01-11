import * as axios from 'axios';

const instance = axios.create();
// instance.defaults.baseURL = 'https://bs.entudomi.delivery/';
// instance.defaults.headers['DB-KEY-BS-API-APP'] = 'aoIGkT5Dp3FVBcZwjeApDWk0qXDnHVE3u29Mlu7AL2wy68yoY9scbeUtz5AB2CZpYCFEWVjZDbGjSEFTJlF2nYRdh1AFtmUDT1UNo8ff3slXAxx8fco9Q6wYzmvnouIKePsWH8U5cjj29C4smHYEYfD2K8ZLTUYXlgMvv1CzNnoRfJiyuJ68VXL5iIWB7lhfG48MqjtAHGU2GwOE3gKOJdP4HhS7v5KfhRAXmmOxDHCAPD27IgFEO7Ly33';
// instance.defaults.headers['DB-ID-BS-API-APP'] = '1';
instance.defaults.baseURL = 'https://sandbox.bs.entudomi.com/';
instance.defaults.headers['DB-KEY-BS-API-APP'] = 'AB80E4xwiay5RQGD4nfn6KirSrZpFpVOa0cytXkqPAHVE3l9lttGXZmjdhXFo7Te5FqfLNW0MTIk74GXIXcy0VjdCcNBWqQEMYBk1UBohkFAp610jwxKUA9zmAHUqaLH3Wvhf4j6iZOS35caAHEjtGK2iw5N74vVyYg0KU3zVj5Cn2RRxiZkwHv339mrYKB0Rwr96ea8rdkNmeD9GDAyX3NeOdfTWOykDZ5fTyZq4AQA1HAjknOO7wQxR1';
instance.defaults.headers['DB-ID-BS-API-APP'] = '2';


export { instance as default };
