export function init() {
  return dispatch => {
    return fetch('http://localhost:3000/products')
      .then(data => data.json())
      .then(data => {
        dispatch({
          type: 'INIT_PRODUCTS',
          value: data
        });

        return data;
      });
  };
}
