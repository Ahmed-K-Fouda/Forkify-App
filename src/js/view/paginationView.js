import view from './view.js';
// import svgIcons
import icons from '../../img/icons.svg';

class PaginationView extends view {
  _parentElement = document.querySelector('.pagination');

  //   generate markup btn

  _generateButtonMarkup(type, page) {
    // الصفحه الحاليه اللي انا فيها هساويها بالصفحه اللي في الState
    const currPage = this._data.page;

    const pageNow = currPage;

    const buttonIcon = type === 'prev' ? 'icon-arrow-left' : 'icon-arrow-right';

    const buttonText =
      type === 'prev' ? `Page ${page - 1}` : `Page ${page + 1}`;

    const dataAttribute =
      type === 'prev'
        ? `data-goto="${currPage - 1}"`
        : `data-goto="${currPage + 1}"`;

    return `
      <button class="btn--inline pagination__btn--${type}" ${dataAttribute}>
        ${
          type === 'prev'
            ? `
          <svg class="search__icon">
          <use href="${icons}#${buttonIcon}"></use>
          </svg>`
            : ''
        }
          
          <span>${buttonText}</span>
          
          ${
            type === 'next'
              ? `
            <svg class="search__icon">
            <use href="${icons}#${buttonIcon}"></use>
            </svg>`
              : ''
          }
          </button>
          `;
  }

  //   علشان اعرض البيانات اللي هتظهر وانا بضغط علي ال pagintaion
  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    // page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return this._generateButtonMarkup('next', currPage);
    }
    // last page
    if (currPage === numPages && numPages > 1) {
      return this._generateButtonMarkup('prev', currPage);
    }
    // other page
    if (currPage < numPages) {
      return `${this._generateButtonMarkup(
        'prev',
        currPage
      )}${this._generateButtonMarkup('next', currPage)}`;
    }
    // page1, and there are NO other pages
    return ``;
  }

  //   add handler to the btn
  //   هحدد اي صفحه هروحلها سواء في ال nxt او ال prev
  addHandlerCLick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = Number(btn.dataset.goto);
      handler(goToPage);
    });
  }
}
export default new PaginationView();
