/* eslint newline-per-chained-call:0 */
import {
  applyMiddleware,
  bindActionCreators,
  createStore,
  combineReducers,
  compose
} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {store as cart, actions as cartActions} from './modules/cart';
import {store as products, actions as productActions} from './modules/products';
import Products from './components/Products';
import Cart from './components/Cart';

const {NODE_ENV} = process.env;
const isDev = NODE_ENV === 'development';
const middleware = [thunk];

if (isDev) {
  middleware.push(createLogger());
}

const reducer = combineReducers({cart, products});
const middlewareWrapper = applyMiddleware(...middleware);
const composed = compose(middlewareWrapper);
const store = createStore(reducer, composed);
const actions = {
  cartActions: bindActionCreators(cartActions, store.dispatch),
  productActions: bindActionCreators(productActions, store.dispatch)
};

const productsComponent = new Products(store, actions); // eslint-disable-line
const cartComponent = new Cart(store, actions);
const app = document.querySelector('[data-app]');

Promise.all([
  actions.cartActions.init(),
  actions.productActions.init()
]).then(() => {
  const productElm = productsComponent.render();
  const cartElm = cartComponent.render();

  app.appendChild(productElm);
  app.appendChild(cartElm);
});
