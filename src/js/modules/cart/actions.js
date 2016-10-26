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

export function update(id, opts = {}) {
  const {method = 'add'} = opts;
  let type;

  switch (method) {
    case 'add':
      type = 'ADD_CART';
      break;
    case 'increment':
      type = 'INCREMENT_CART';
      break;
    case 'decrement':
      type = 'DECREMENT_CART';
      break;
  }

  return {
    type,
    id
  };
}
