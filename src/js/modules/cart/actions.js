import getTotal from '../../utils/get-total';

export function init() {
  return dispatch => {
    return fetch('http://localhost:3000/cart_order')
      .then(data => data.json())
      .then(data => {
        dispatch({
          type: 'INIT_CART',
          value: data
        });

        return data;
      });
  };
}

export function toggleCart(opts = {}) {
  const {open} = opts;

  return {
    type: 'TOGGLE_CART',
    open
  };
}

export function update(id, opts = {}) {
  return (dispatch, getState) => {
    const {method = 'add'} = opts;
    const state = getState();
    const {products, cart} = state;
    const {price} = products[id];
    const {quantity} = cart.items && cart.items[id] || {};
    let type, subTotal;

    switch (method) {
      case 'add':
        type = 'ADD_CART';
        subTotal = price;
        break;
      case 'remove':
        type = 'REMOVE_CART';
        subTotal = -(price * quantity);
        break;
      case 'increment':
        type = 'INCREMENT_CART';
        subTotal = price;
        break;
      case 'decrement':
        type = 'DECREMENT_CART';
        subTotal = -price;
        break;
    }

    dispatch({
      type,
      id,
      total: getTotal(state, subTotal)
    });
  };
}
