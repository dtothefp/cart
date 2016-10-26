/* eslint no-unreachable:0 */

export default function(state = {}, action) {

  switch (action.type) {
    case 'INIT_PRODUCTS':
      return action.value.reduce((acc, {id, ...rest}) => ({
        ...acc,
        [id]: rest
      }), Object.assign({}, state));
      break;
  }

  return state;
}
