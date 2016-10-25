/* eslint-disable */
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
import cartTemp from './client-templates/cart.html';
import productsTemp from './client-templates/products.html';

const toNumber = num => Number(num.replace(/[^0-9\.]+/g, ''));
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

Promise.all([
  actions.productActions.init(),
  actions.cartActions.init()
]).then(([products, items]) => {
  const renderedCartTemp = cartTemp.render({
    items,
    shipping: 'shipping',
    total: items.reduce((acc, {price}) => acc + toNumber(price), 0)
  });
  const renderedProductsTemp = productsTemp.render({
    products
  });
  const productWrapper = document.createElement('div');
  const cartWrapper = document.createElement('div');

  productWrapper.innerHTML = renderedProductsTemp;
  cartWrapper.innerHTML = renderedCartTemp;

  document.body.appendChild(productWrapper);
  document.body.appendChild(cartWrapper);
});

// TODO: get carts items from API request for ID


// fetch('http://localhost:3000/cart_order', {
  // method: 'post',
  // headers: {
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json'
  // },
  // body: JSON.stringify({
    // email: 'bleep',
    // answer: 'bloop'
  // })
// });
