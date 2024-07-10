// import svgIcons
import icons from '../../img/icons.svg';

export default class View {
  _data;

  /**
   * render the recived object to the DOM
   * @param {Object | Object[]} data the data to be rendered (e.g. recipe)
   * @param {boolean} [render = true] if false create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render is false
   * @this {Object} View Object instance
   * @author Ahmed Khaled Fouda...
   */

  render(data, render = true) {
    // check if there no data for search result
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    // علشان نعمل view مشترك للبوك مارك والريزلت فيو علشان نعمل refactor
    if (!render) return markup;

    this._clearHtml();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clearHtml() {
    this._parentElement.innerHTML = '';
  }

  //   create update fun ==> هنعملها علشان نحل مشكله ان الصفحه ما اتعملش render لكل العناصر مع اي manuplate وبالتالي هتقل ال browser
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Check if newEl has child nodes before accessing firstChild
      if (newEl.firstChild && curEl.firstChild) {
        // Update change text if firstChild exists and is not null
        if (
          !newEl.isEqualNode(curEl) &&
          newEl.firstChild.nodeValue.trim() !== ''
        ) {
          curEl.textContent = newEl.textContent;
        }
      }

      // Update change attribute
      if (newEl.attributes) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  // render spinner
  renderSpinner = function () {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
  `;
    this._clearHtml();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  //   err message
  renderError(message = this._errMessage) {
    const markup = `

    <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clearHtml();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //   sucssess msg

  renderMessage(message = this._message) {
    const markup = `

    <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._clearHtml();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
