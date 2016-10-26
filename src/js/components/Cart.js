import union from 'lodash/union';
import CartItem from './CartItem';
import template from '../client-templates/cart.html';
import currencyToNumber from '../utils/currency-to-number';

export default class Cart {
  constructor(store, actions) {
    this.store = store;
    this.state = store.getState();
    this.actions = actions;
    this.elm = document.createElement('div');
    this.elm.classList.add('cart');
    this.children = {};
    this.subscribe();
    this.addObservers();
  }

  render() {
    const ctx = {
      count: Object.keys(this.state.cart).length,
      total: this.getTotal()
    };
    const html = template.render(ctx);
    this.elm.innerHTML = html;

    const frag = this.addItems(this.state.cart, this.state.products);

    this.itemsElm = this.elm.querySelector('.cart__items');
    this.itemsElm.appendChild(frag);

    return this.elm;
  }

  getTotal() {
    return Object.keys(this.state.cart).reduce((num, id) => {
      return num + currencyToNumber(this.state.products[id].price);
    }, 0);
  }

  addObservers() {
    const elms = [...this.elm.querySelectorAll('[data-js-cart]')];

    this.observers = elms.reduce((acc, elm) => {
      const {jsUpdate} = elm.dataset;

      acc[jsUpdate] = elm;

      return acc;
    }, {});
  }

  addItems(items, products) {
    return Object.keys(items).reduce((frag, id) => {
      const child = new CartItem(this.actions, {
        id,
        state: {
          ...items[id],
          ...products[id]
        }
      });

      this.children[id] = child;
      frag.appendChild(child.elm);

      return frag;
    }, document.createDocumentFragment());
  }

  subscriber() {
    const state = this.store.getState();

    if (this.itemsElm) {
      const childKeys = Object.keys(this.children);
      const cartKeys = Object.keys(state.cart);
      const keys = union(childKeys, cartKeys);
      let frag;

      keys.forEach(id => {
        const currState = state.cart[id];
        let child = this.children[id];

        if (currState && child) {
          // update the current child
          child.update(currState);
        } else if (currState && !child) {
          frag = frag || document.createDocumentFragment();
          // add a new child
          child = this.children[id] = new CartItem(this.actions, {
            id,
            state: {
              quantity: 1,
              ...state.products[id]
            }
          });

          this.children[id] = child;
          frag.append(child.elm);
        } else if (!currState && child) {
          // remove a child
          delete this.children[id];
          this.itemsElm.removeChild(child.elm);
        }
      });

      if (frag) {
        this.itemsElm.appendChild(frag);
      }
    }

    this.lastState = this.state;
    this.state = state;
  }

  subscribe() {
    this.store.subscribe(() => this.subscriber());
  }
}
