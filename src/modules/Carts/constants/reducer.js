import * as actions from "./actions";
import { handleActions } from "redux-actions";
import { clearAll } from "../../../common/redux/actions/uiActions";

const addCart = (state, cartItems, product) => {
  let cartItem;
  const isCombos = product.isCombos || false;
  if (!isCombos) {
    cartItem = cartItems.filter(
      (item) => item.productId === product.productId && !item.comboId
    )[0];
    return {
      combo: state.combo,
      details: addProductToCart(cartItems, cartItem, product),
    };
  } else {
    const comboId = product.isCombos;
    cartItem = cartItems.filter((item) => item.comboId === comboId);
    return addComboToCart(state.combo, cartItems, cartItem, product);
  }
};

const addProductToCart = (cartItems, cartItem, product) => {
  if (cartItem === undefined) {
    return [
      ...cartItems,
      {
        ...product,
        quantity: product.quantity || 1,
        unitPrice: product.product.price,
        totalPrice: (product.quantity || 1) * product.product.price,
      },
    ];
  } else {
    return cartItems.map((item) =>
      item.productId === cartItem.productId
        ? {
            ...item,
            quantity: item.quantity + product.quantity,
            totalPrice: (item.quantity + product.quantity) * item.unitPrice,
          }
        : item
    );
  }
};

const addComboToCart = (combos, cartItems, cartItem, product) => {
  const combo = product.product;
  if (cartItem[0] === undefined) {
    const includeCart = combo?.comboDetails?.reduce(
      (value, product) =>
        value.concat({
          ...product,
          quantity: product.quantity || 1,
          unitPrice: product.product.price,
          totalPrice: (product.quantity || 1) * product.product.price,
        }),
      []
    );
    return {
      combo: [
        ...combos,
        {
          comboId: combo.id,
          quantity: includeCart[0].quantity || 1,
          comboPrice: combo.priceForSale,
        },
      ],
      details: [...cartItems, ...includeCart],
    };
  } else {
    return {
      combo: combos.map((item) =>
        item.comboId === product.isCombos
          ? {
              ...item,
              quantity: item.quantity + product.quantity,
            }
          : item
      ),
      details: cartItems.map((item) =>
        item.comboId === product.isCombos
          ? {
              ...item,
              quantity: item.quantity + product.quantity,
              totalPrice: (item.quantity + product.quantity) * item.unitPrice,
            }
          : item
      ),
    };
  }
};

const remainingItems = (state, cartItems, product) => {
  if (product.comboId) {
    return {
      combo: state.combo.filter((item) => item.comboId !== product.comboId),
      details: cartItems.filter(
        (cartItem) => cartItem.comboId !== product.comboId
      ),
    };
  }

  return {
    combo: state.combo,
    details: cartItems.filter(
      (cartItem) => cartItem.productId !== product.productId
    ),
  };
};

const defaultState = {
  combo: [],
  details: [],
};

const handler = {
  [clearAll]: (state, action) => defaultState,
  [actions.addToCart]: (state, action) =>
    addCart(state, state.details, action.payload),
  [actions.decreaseQuantity]: (state, action) => {
    if (action.payload.quantity < 2) {
      return remainingItems(state, state.details, action.payload);
    } else {
      if (action.payload.comboId) {
        return {
          combo: state.combo.map((item) =>
            item.comboId === action.payload.comboId
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          ),
          details: state.details.map((item) =>
            item.comboId === action.payload.comboId
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: (item.quantity - 1) * item.unitPrice,
                }
              : item
          ),
        };
      } else {
        return {
          combo: state.combo,
          details: state.details.map((item) =>
            item.productId === action.payload.productId
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                  totalPrice: (item.quantity - 1) * item.unitPrice,
                }
              : item
          ),
        };
      }
    }
  },
  [actions.deleteFromCart]: (state, action) =>
    remainingItems(state, state.details, action.payload),
  [actions.deleteAllFromCart]: (state, action) => defaultState,
};

export default handleActions(handler, defaultState);
