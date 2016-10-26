import temp from '../client-templates/product.html';

export default class Product {
  constructor(actions, {id, state}) {
    this.state = state;
    this.actions = actions;
    this.elm = document.createElement('div');
    this.elm.classList.add('products__product');
    this.elm.innerHTML = temp.render(state);
    this.added = false;
    this.id = id;
    this.addListeners();
  }

  addListeners() {
    const buttonElm = this.elm.querySelector('[data-js="add-product"]');

    buttonElm.addEventListener('click', this.handleAdd.bind(this));
  }

  handleAdd(e) {
    if (!this.added) {
      // use fetch to post here
      this.actions.cartActions.update(this.id);
    }
  }
}
