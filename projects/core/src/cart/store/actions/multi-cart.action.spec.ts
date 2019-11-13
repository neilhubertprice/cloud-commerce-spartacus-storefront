import { Cart } from '../../../model/cart.model';
import { StateEntityLoaderActions } from '../../../state/utils/index';
import { CartActions } from './index';
import { MULTI_CART_FEATURE } from '../multi-cart-state';
import { entityRemoveMeta } from '../../../state/utils/entity/entity.action';
import { entityResetMeta } from '../../../state/utils/entity-loader/entity-loader.action';

const cart: Cart = {
  code: 'xxx',
  guid: 'xxx',
  totalItems: 0,
  totalPrice: {
    currencyIso: 'USD',
    value: 0,
  },
  totalPriceWithTax: {
    currencyIso: 'USD',
    value: 0,
  },
};

describe('MultiCart Actions', () => {
  describe('FreshCart Actions', () => {
    describe('ResetFreshCart', () => {
      it('should create the action', () => {
        const action = new CartActions.ResetFreshCart();
        expect({ ...action }).toEqual({
          type: CartActions.RESET_FRESH_CART,
          meta: StateEntityLoaderActions.entityResetMeta(
            MULTI_CART_FEATURE,
            'fresh'
          ),
        });
      });
    });

    describe('SetFreshCart', () => {
      it('should create the action', () => {
        const payload = cart;
        const action = new CartActions.SetFreshCart(payload);
        expect({ ...action }).toEqual({
          type: CartActions.SET_FRESH_CART,
          payload,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            MULTI_CART_FEATURE,
            'fresh'
          ),
        });
      });
    });

    describe('CreateMultiCart', () => {
      it('should create the action', () => {
        const action = new CartActions.CreateMultiCart(undefined);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_MULTI_CART,
          payload: undefined,
          meta: StateEntityLoaderActions.entityLoadMeta(
            MULTI_CART_FEATURE,
            'fresh'
          ),
        });
      });
    });

    describe('CreateMultiCartFail', () => {
      it('should create the action', () => {
        const action = new CartActions.CreateMultiCartFail(undefined);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_MULTI_CART_FAIL,
          payload: undefined,
          meta: StateEntityLoaderActions.entityFailMeta(
            MULTI_CART_FEATURE,
            'fresh'
          ),
        });
      });
    });

    describe('CreateMultiCartSuccess', () => {
      it('should create the action', () => {
        const payload = { cart, userId: 'userId' };
        const action = new CartActions.CreateMultiCartSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.CREATE_MULTI_CART_SUCCESS,
          payload,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            MULTI_CART_FEATURE,
            cart.code
          ),
        });
      });
    });

    describe('LoadMultiCart', () => {
      it('should create the action', () => {
        const payload = { cartId: 'cartId', userId: 'userId' };
        const action = new CartActions.LoadMultiCart(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_MULTI_CART,
          payload,
          meta: StateEntityLoaderActions.entityLoadMeta(
            MULTI_CART_FEATURE,
            payload.cartId
          ),
        });
      });
    });

    describe('LoadMultiCartFail', () => {
      it('should create the action', () => {
        const payload = { cartId: 'cartId', error: 'error' };
        const action = new CartActions.LoadMultiCartFail(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_MULTI_CART_FAIL,
          payload,
          meta: StateEntityLoaderActions.entityFailMeta(
            MULTI_CART_FEATURE,
            payload.cartId,
            payload.error
          ),
        });
      });
    });

    describe('LoadMultiCartSuccess', () => {
      it('should create the action', () => {
        const payload = { cart, userId: 'userId', extraData: undefined };
        const action = new CartActions.LoadMultiCartSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.LOAD_MULTI_CART_SUCCESS,
          payload,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            MULTI_CART_FEATURE,
            payload.cart.code
          ),
        });
      });
    });

    describe('MergeMultiCart', () => {
      it('should create the action', () => {
        const payload = {};
        const action = new CartActions.MergeMultiCart(payload);
        expect({ ...action }).toEqual({
          type: CartActions.MERGE_MULTI_CART,
          payload,
        });
      });
    });

    describe('MergeMultiCartSuccess', () => {
      it('should create the action', () => {
        const payload = {
          oldCartId: 'oldCartId',
          cartId: 'cartId',
          userId: 'userId',
        };
        const action = new CartActions.MergeMultiCartSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.MERGE_MULTI_CART_SUCCESS,
          payload,
          meta: entityRemoveMeta(MULTI_CART_FEATURE, payload.oldCartId),
        });
      });
    });

    describe('ResetMultiCartDetails', () => {
      it('should create the action', () => {
        const action = new CartActions.ResetMultiCartDetails();
        expect({ ...action }).toEqual({
          type: CartActions.RESET_MULTI_CART_DETAILS,
          meta: entityResetMeta(MULTI_CART_FEATURE, undefined),
        });
      });
    });

    describe('SetCartLoading', () => {
      it('should create the action', () => {
        const payload = { cartId: 'cartId' };
        const action = new CartActions.SetCartLoading(payload);
        expect({ ...action }).toEqual({
          type: CartActions.SET_CART_LOADING,
          payload,
          meta: StateEntityLoaderActions.entityLoadMeta(
            MULTI_CART_FEATURE,
            payload.cartId
          ),
        });
      });
    });

    describe('RemoveCart', () => {
      it('should create the action', () => {
        const payload = 'cartId';
        const action = new CartActions.RemoveCart(payload);
        expect({ ...action }).toEqual({
          type: CartActions.REMOVE_CART,
          payload,
          meta: entityRemoveMeta(MULTI_CART_FEATURE, payload),
        });
      });
    });

    describe('AddEmailToMultiCart', () => {
      it('should create the action', () => {
        const payload = {
          userId: 'userId',
          cartId: 'cartId',
          email: 'test@email.com',
        };
        const action = new CartActions.AddEmailToMultiCart(payload);
        expect({ ...action }).toEqual({
          type: CartActions.ADD_EMAIL_TO_MULTI_CART,
          payload,
          meta: StateEntityLoaderActions.entityLoadMeta(
            MULTI_CART_FEATURE,
            payload.cartId
          ),
        });
      });
    });

    describe('AddEmailToMultiCartFail', () => {
      it('should create the action', () => {
        const payload = { userId: 'userId', cartId: 'cartId', error: 'error' };
        const action = new CartActions.AddEmailToMultiCartFail(payload);
        expect({ ...action }).toEqual({
          type: CartActions.ADD_EMAIL_TO_MULTI_CART_FAIL,
          payload,
          meta: StateEntityLoaderActions.entityFailMeta(
            MULTI_CART_FEATURE,
            payload.cartId,
            payload.error
          ),
        });
      });
    });

    describe('AddEmailToMultiCartSuccess', () => {
      it('should create the action', () => {
        const payload = { userId: 'userId ', cartId: 'cartId' };
        const action = new CartActions.AddEmailToMultiCartSuccess(payload);
        expect({ ...action }).toEqual({
          type: CartActions.ADD_EMAIL_TO_MULTI_CART_SUCCESS,
          payload,
          meta: StateEntityLoaderActions.entitySuccessMeta(
            MULTI_CART_FEATURE,
            payload.cartId
          ),
        });
      });
    });
  });
});