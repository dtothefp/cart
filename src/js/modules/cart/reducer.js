/* eslint no-fallthrough:0 */
import merge from 'lodash/merge';
import omit from 'lodash/omit';

export default function(state = {}, action) {
  const {id} = action;
  const currState = state[id];
  let nextState, quantity;

  switch (action.type) {
    case 'INIT_CART':
      nextState = action.value.reduce((acc, {id, quantity = 1}) => ({
        ...acc,
        [id]: {quantity}
      }), Object.assign({}, state));
      break;
    case 'ADD_CART':
      if (currState) {
        quantity = currState.quantity ? currState.quantity + 1 : 1;
      } else {
        quantity = 1;
      }
      break;
    case 'INCREMENT_CART':
      quantity = currState.quantity + 1;
      break;
    case 'DECREMENT_CART':
      quantity = currState.quantity - 1;
      break;
  }


  if (quantity) {
    nextState = merge({}, state, {
      [id]: {quantity}
    });
  } else if (id) {
    nextState = omit(state, id);
  }

  return nextState || state;
}
