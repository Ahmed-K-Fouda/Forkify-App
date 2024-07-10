import { async } from 'regenerator-runtime';

// import from config file
import { API_URL, RESULT_PER_PAGE, KEY } from './config.js';

// import from helper file
import { AJAX } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultPerPage: RESULT_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

// ------------------------------------------------

// create function for recipe
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    publisher: recipe.publisher,
    cookingTime: recipe.cooking_time,
    image: recipe.image_url,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    servings: recipe.servings,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }), // => short circuit => if the key not exist don nothing and if not give it name
  };
};

// ------------------------------------------------

// export this fun to the controller file
export const loadRecipe = async function (id) {
  try {
    // get Json data

    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    // check if the bookmarked is true to make the icon fill
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw `${err}`;
  }
};

// ------------------------------------------------

// export this fun to the controller file
// هنا انا هعرض الوصفه بناء علي الinput اللي اتكتب واعملو updata في ال state obj{}
export const loadSearchResult = async function (query) {
  try {
    // save query on state
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    // map over recipes and stores the result on state
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        publisher: rec.publisher,
        image: rec.image_url,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw `${err}`;
  }
};
// ------------------------------------------------

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultPerPage; //0;
  const end = page * state.search.resultPerPage; //10;
  return state.search.results.slice(start, end);
};

// ------------------------------------------------

// serving updata
// هحدد الكميه بناء علي عدد الServings
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

// ------------------------------------------------

// save bookmarks to local storage
const persistentBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// ------------------------------------------------

// create fun for add bookmark
export const addBookmark = function (recipe) {
  // add recipe to bookmark[]
  state.bookmarks.push(recipe);
  // add bookmark to the cuu recipe
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  // add to local storage
  persistentBookmarks();
};

// ------------------------------------------------

// create fun for remove bookmark
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  // delete bookmark on the curr recipe
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  // add to local storage
  persistentBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

// ------------------------------------------------

// upload recipe ==> هنا انا عايز اخلي القيم اللي عندي زي القيم الموجوده في api بحيث اقسمها نفس التقسيمه
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'please enter correct gradiend like a format seperated by (,) :)'
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      // id: newRecipe.id,
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

    // هنخزن البيانات اللي المستخدم هيكتبها في ال recipe بحيث نقدر نعرضها في الانترفيس
    state.recipe = createRecipeObject(data);
    // deleteBookmark(state.recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
