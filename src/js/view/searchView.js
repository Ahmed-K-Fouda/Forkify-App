class SearchView {
  _parentElement = document.querySelector('.search');

  //   هاخد القيمه من ال input الوجود عندي وهعمل البحث بناء علي القيمه دي
  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    // clear input
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
