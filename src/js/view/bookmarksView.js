import view from './view.js';
// import svgIcons
import icons from '../../img/icons.svg';
// import previewview
import previewView from './previewView.js';

class bookmarkView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errMessage = ' No bookmarks yet. Find a nice recipe and bookmark it :)';
  _successMessage = '';

  addHandlerRender(handler){
    window.addEventListener('load', handler)
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new bookmarkView();
