import {expect} from 'chai';
import fetchMock from 'fetch-mock';
import flux from '../../../src/js/modules/bootstrap';

const mockCart = [{id: '1'}];

fetchMock.get('http://localhost:3000/cart_order', mockCart);

describe('cart-flux-module', () => {
  const id = 2;
  const {store, actions} = flux();
  const getState = () => store.getState().cart;

  it('should initialize cart items from the api', async () => {
    await actions.cartActions.init();

    const state = getState();
    const expected = {
      '1': {
        quantity: 1
      }
    };

    expect(state).to.eql(expected);
  });

  it('should add an item', () => {
    actions.cartActions.update(id);
    const state = getState();

    expect(state[id].quantity).to.equal(1);
  });

  it('should increment an item\'s quantity', () => {
    actions.cartActions.update(id, {method: 'increment'});
    const state = getState();

    expect(state[id].quantity).to.equal(2);
  });

  it('should decrement an item', () => {
    actions.cartActions.update(id, {method: 'decrement'});
    const state = getState();

    expect(state[id].quantity).to.equal(1);
  });

  it('should remove an item from the store if it\'s quantity is zero', () => {
    actions.cartActions.update(id, {method: 'decrement'});
    const state = getState();

    expect(state[id]).to.be.undefined;
  });
});
