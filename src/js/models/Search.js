import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}


// const proxy = 'https://cors-anywhere.herokuapp.com/';

// https://www.food2fork.com/api/search
// 22c2a602f889a7fa0e6375367e904914

// 462b1cc8d4f2730081462fbc65136320 Jonas' key