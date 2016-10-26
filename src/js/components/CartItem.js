import temp from '../client-templates/cart-item.html';
import currencyToNumber from '../utils/currency-to-number';

export default class CartItem {
  constructor(actions, {id, state}) {
    this.basePrice = currencyToNumber(state.price);
    this.state = {
      ...state,
      quantity: state.quantity || 1,
      price: this.basePrice
    };
    this.actions = actions;
    this.elm = document.createElement('div');
    this.elm.classList.add('cart__items-item');
    this.elm.innerHTML = temp.render(this.state);
    this.id = id;
    this.addListeners();
    this.addObservers();
  }

  addListeners() {
    this.elm.addEventListener('click', this.handleClick.bind(this));
  }

  addObservers() {
    const elms = [...this.elm.querySelectorAll('[data-js-update]')];

    this.observers = elms.reduce((acc, elm) => {
      const {jsUpdate} = elm.dataset;

      acc[jsUpdate] = elm;

      return acc;
    }, {});
  }

  handleClick(e) {
    e.preventDefault();

    const method = e.target.dataset && e.target.dataset.jsQuantity;

    if (method) {
      this.actions.cartActions.update(this.id, {method});
    }
  }

  update({quantity}) {
    if (quantity !== this.state.quantity) {
      this.lastState = this.state;
      this.state = Object.assign({}, this.lastState, {
        quantity,
        price: this.basePrice * quantity
      });

      this.observers.quantity.textContent = this.state.quantity;
      this.observers.price.textContent = this.state.price;
    }
  }
}
