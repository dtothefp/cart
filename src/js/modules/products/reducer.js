/* eslint no-unreachable:0 */

export default function(state = {}, action) {

  switch (action.type) {
    case 'INIT_PRODUCTS':
      return Object.assign({}, state, {
        products: action.value
      });
      break;
  }

  return state;
}
