import CartItem from './CartItem';
import template from '../client-templates/cart.html';
/* eslint no-debugger:0 */

export default class Products {
  constructor(store, actions) {
    this.store = store;
    this.state = store.getState();
    this.actions = actions;
    this.elm = document.createElement('div');
    this.elm.classList.add('cart');
    this.subscribe();
  }

  render() {
    const html = template.render();

    this.elm.innerHTML = html;
    this.itemsElm = this.elm.querySelector('.cart__items');

    const frag = this.addItems(this.state.cart, this.state.products);

    this.itemsElm.appendChild(frag);
    this.subscribe();

    return this.elm;
  }

  addItems(items, products) {
    return Object.keys(items).reduce((frag, id) => {
      const {elm} = new CartItem(this.actions, {
        id,
        state: {
          ...items[id],
          ...products[id]
        }
      });

      frag.appendChild(elm);

      return frag;
    }, document.createDocumentFragment());
  }

  subscribe() {
    this.store.subscribe(state => {
      this.state = this.store.getState();
    });
  }
}
