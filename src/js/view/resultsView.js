import view from './view.js';
import previewView from './previewView.js';
// import svgIcons
import icons from '../../img/icons.svg';

class ResultsView extends view {
  _parentElement = document.querySelector('.results');
  _errMessage = 'No recipe found for your query! Please try again';
  _successMessage = '';
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
