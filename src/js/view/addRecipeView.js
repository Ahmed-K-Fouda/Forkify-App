import view from './view.js';
// import svgIcons
import icons from '../../img/icons.svg';

class addRecipeView extends view {
  _message = 'Recipe was succssfully uploaded ✔:)'
  _parentElement = document.querySelector('.upload');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //   selected all inputs then spreed the data to get an array then ==> converted the data to object
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr)  
      handler(data)
    });
  }

  _generateMarkup() {}
}
export default new addRecipeView();
