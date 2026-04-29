import { createSlice } from '@reduxjs/toolkit';

const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

const updateCart = (state) => {
  state.cartItems = state.cartItems.filter(item => item !== null);
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + (item?.price || 0) * (item?.qty || 0), 0)
  );
  // Calculate shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  // Calculate tax price
  state.taxPrice = addDecimals(Number((0.18 * state.itemsPrice).toFixed(2)));
  // Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));
  return state;
};

const getInitialState = () => {
  const cart = localStorage.getItem('cart');
  if (cart) {
    const parsed = JSON.parse(cart);
    if (parsed.cartItems) {
      parsed.cartItems = parsed.cartItems.filter(item => item !== null);
    }
    return parsed;
  }
  return { cartItems: [], shippingAddress: {}, paymentMethod: 'Card' };
};

const initialState = getInitialState();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
