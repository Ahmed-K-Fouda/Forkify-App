import * as model from './model.js';
// imprt recipeView
import recipeView from './view/recipeView.js';
// import search view
import searchView from './view/searchView.js';
// import resultView
import resultsView from './view/resultsView.js';
// import pagination view
import paginationView from './view/paginationView.js';
// import bookmark view
import bookmarksView from './view/bookmarksView.js';
// import addrecipeview
import addRecipeView from './view/addRecipeView.js';
// import from config closewindow
import { MODEL_CLOSE_SEC } from './config.js';

// import core-js , regenrator
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import View from './view/view.js';

// activate hot moudle reloading
// if (module.hot) {
//   module.hot.accept();
// }

// const recipeContainer = document.querySelector('.recipe');

///////////////////////////////////////

const controllRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    // guard class
    if (!id) return;

    // update the result view to add active to chosen recipe
    resultsView.update(model.getSearchResultsPage());

    // updatate bookmarks
    bookmarksView.update(model.state.bookmarks);

    // show spinnerReload
    recipeView.renderSpinner();

    // from the model
    await model.loadRecipe(id);

    // render recipe from recipeView
    recipeView.render(model.state.recipe);

    // debugger;
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

// ----------------------------------------

// search function
const controllSearchResult = async function () {
  try {
    // render spinner on search
    resultsView.renderSpinner();

    // get search query
    const query = searchView.getQuery();

    // guard class
    if (!query) return;

    // load search result
    await model.loadSearchResult(query);

    //  render search results
    resultsView.render(model.getSearchResultsPage());

    // render pagintaion pages
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

// ----------------------------------------

// create controll pagination fun
const controllPagination = function (goToPage) {
  //  render new search results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // render new pagintaion pages
  paginationView.render(model.state.search);
};

// ----------------------------------------

// create updtaeServing fun
const controllServings = function (newServings) {
  // updata serving (state)
  model.updateServings(newServings);
  // updata recipe view
  // recipeView.render(model.state.recipe); => we not use this because the refleceting and to not slow the browser
  recipeView.update(model.state.recipe);
};

// create controll bookdmark
const controllAddBookmark = function () {
  // add or remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // update recipe view
  recipeView.update(model.state.recipe);
  // render bookmark
  bookmarksView.render(model.state.bookmarks);
};

// ----------------------------------------

// handler bookmarks controller
const controllBookmark = function () {
  bookmarksView.render(model.state.bookmarks);
};

// ----------------------------------------

// controll addrecipe
const controllAddRecipe = async function (newRecipe) {
  try {
    // upload the recipe data
    await model.uploadRecipe(newRecipe);

    // render recipe
    recipeView.render(model.state.recipe);

    //render spinner

    addRecipeView.renderSpinner();

    // render bookmark view to add added recipe nto bookmark
    bookmarksView.render(model.state.bookmarks);

    // change ID on url => window.history.pushState(state, title, url)

    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //render success message
    setTimeout(() => {
      addRecipeView.renderMessage();
    }, MODEL_CLOSE_SEC * 1000);
    // close form
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1500);
  } catch (err) {
    console.error('🚨🚨🚨', err);
    // render err message
    addRecipeView.renderError(err.message);
  }
};

// ----------------------------------------

// create init fun
const init = function () {
  // call handler bookmark
  bookmarksView.addHandlerRender(controllBookmark);
  // call handler render
  recipeView.addHandlerRender(controllRecipe);
  // call handelrserving
  recipeView.addHandlerUpdateServings(controllServings);
  // call bookmark
  recipeView.addHandlerBookmark(controllAddBookmark);
  // call handler search
  searchView.addHandlerSearch(controllSearchResult);
  // call handler pagination
  paginationView.addHandlerCLick(controllPagination);
  // call handler Upload recpe
  addRecipeView.addHandlerUpload(controllAddRecipe);
};
init();
