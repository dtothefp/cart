/* eslint no-fallthrough:0 */
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';

export default function(state = {}, action) {
  const {id, total} = action;
  const currState = state.items && state.items[id];
  let nextState, quantity, items;

  switch (action.type) {
    case 'INIT_CART':
      const initalState = Object.assign({
        open: false,
        items: {}
      }, state);

      nextState = action.value.reduce((acc, {id, quantity = 1}) => {
        acc.items[id] = {quantity};

        return acc;
      }, initalState);
      break;
    case 'TOGGLE_CART':
      nextState = Object.assign({}, state, {
        open: isBoolean(action.open) ? action.open : !state.open
      });
      break;
    case 'ADD_CART':
      if (currState) {
        quantity = currState.quantity ? currState.quantity + 1 : 1;
      } else {
        quantity = 1;
      }
      break;
    case 'REMOVE_CART':
      quantity = 0;
      break;
    case 'INCREMENT_CART':
      quantity = currState.quantity + 1;
      break;
    case 'DECREMENT_CART':
      quantity = currState.quantity - 1;
      break;
  }

  if (quantity) {
    items = {
      [id]: {quantity}
    };
    nextState = merge({}, state, {items});
  } else if (quantity === 0 && id) {
    items = omit(state.items, id);
    nextState = Object.assign({}, state, {items});
  }

  if (isNumber(total)) {
    Object.assign(nextState, {total});
  }

  if (nextState && nextState.items) {
    const count = Object.keys(nextState.items).reduce((c, id) => {
      const {quantity} = nextState.items[id];

      return c + quantity;
    }, 0);

    Object.assign(nextState, {count});
  }

  return nextState || state;
}
