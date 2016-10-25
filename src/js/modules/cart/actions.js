function getItem(id) {
  return fetch(`http://localhost:3000/products/${id}`)
    .then(data => data.json());
}

export function init() {
  return dispatch => {
    return fetch('http://localhost:3000/cart_order')
      .then(data => data.json())
      .then(data => {
        return Promise.all(
          data.map(({id}) => getItem(id))
        );
      }).then(data => {
        dispatch({
          type: 'INIT_CART',
          value: data
        });

        return data;
      });
  };
}
