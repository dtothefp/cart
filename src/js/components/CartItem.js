import temp from '../client-templates/cart-item.html';

export default class Product {
  constructor(actions, {id, state}) {
    this.state = state;
    this.actions = actions;
    this.elm = document.createElement('div');
    this.elm.classList.add('cart__items-item');
    this.elm.innerHTML = temp.render(state);
    this.id = id;
    this.addListeners();
  }

  addListeners() {
    this.elm.addEventListener('click', this.handleClick.bind(this));
  }

  handleClick(e) {
    const method = e.target.dataset && e.target.dataset.jsQuantity;

    if (method) {
      this.actions.cartActions.update(this.id, {method});
    }
  }
}
