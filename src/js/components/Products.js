import Product from './Product';
import template from '../client-templates/products.html';
/* eslint no-debugger:0 */

export default class Products {
  constructor(store, actions) {
    this.store = store;
    this.state = store.getState();
    this.actions = actions;
    this.elm = document.createElement('div');
    this.elm.classList.add('products');
    this.subscribe();
  }

  render() {
    const html = template.render();
    this.elm.innerHTML = html;

    const frag = this.addProducts(this.state.products);

    this.elm.appendChild(frag);
    this.subscribe();

    return this.elm;
  }

  addProducts(products) {
    return Object.keys(products).reduce((frag, id) => {
      const {elm} = new Product(this.actions, {
        id,
        state: products[id]
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
