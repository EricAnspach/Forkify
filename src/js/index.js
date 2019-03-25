// Global app controller

// Three ways to import from other views:
// import str from './models/Search';
// import { add as a, multiply as m, ID } from './views/searchView';
// import * as searchView from './views/searchView';

// console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3,5)}. ${str}`);

import axios from 'axios';

async function getResults(query) {
    // const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '462b1cc8d4f2730081462fbc65136320';
    // const result = await axios(`https://www.food2fork.com/api/search?key=${key}&q=chicken%20breast&page=2`);
    const res = await axios(`https://www.food2fork.com/api/search?key=22c2a602f889a7fa0e6375367e904914&q=soup`);
    console.log(res);
}
getResults('pizza');

// https://www.food2fork.com/api/search
// 22c2a602f889a7fa0e6375367e904914