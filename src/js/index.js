// Global app controller

// Three ways to import from other views:
// import str from './models/Search';
// import { add as a, multiply as m, ID } from './views/searchView';
// import * as searchView from './views/searchView';

// console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3,5)}. ${str}`);

import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

/** Global state of the app
 *  - Search object
 *  - Current recipe object
 *  - Shopping list object
 *  - Liked recipes object
*/
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1) get query from view
    const query = searchView.getInput();

    if(query) {
        // 2) create new state object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for results
            await state.search.getResults();
    
            // 5) render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);            
        } catch (error) {
            alert('Error with the search');
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');    
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/**
 * RECIPE CONTROLLER
 */

 const controlRecipe = async () => {
     // Get ID from url
     const id = window.location.hash.replace('#', '');
     console.log(id);

     // If statement to insure that there is an ID for a recipe
     if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight the selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create the recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
    
            // Calculate servings and time
            state.recipe.calcServings();
            state.recipe.calcTime();
    
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            
        } catch (error) {
            alert('Error getting recipe')
        }
     }
 };

// One line of code can add eventListeners to multiple events, rather than the code below
 ['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
//  window.addEventListener('hashchange', controlRecipe);
//  window.addEventListener('load', controlRecipe);

/**
 * LIST CONTROLLER
 */
const controlList = () => {
    // Create a new list if there is no list yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

    }
});

// Handling recipe button clicks
elements.recipe.addEventListener('click', e =>{
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // If decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // If increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    }
});

window.l = new List();