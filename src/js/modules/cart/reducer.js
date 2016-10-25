/* eslint no-unreachable:0 */

export default function(state = {}, action) {

  switch (action.type) {
    case 'INIT_CART':
      return Object.assign({}, state, {
        items: action.value
      });
      break;
  }

  return state;
}
