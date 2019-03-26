// Global app controller

// Three ways to import from other views:
// import str from './models/Search';
// import { add as a, multiply as m, ID } from './views/searchView';
// import * as searchView from './views/searchView';

// console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3,5)}. ${str}`);

import Search from './models/Search';

/** Global state of the app
 *  - Search object
 *  - Current recipe object
 *  - Shopping list object
 *  - Liked recipes object
*/
const state = {};

const controlSearch = async () => {
    // 1) get query from view
    const query = 'pizza'; // todo later

    if(query) {
        // 2) create new state object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results

        // 4) Search for results
        await state.search.getResults();

        // 5) render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


