import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { ProductType } from "../types";

// Define a type for the slice state
interface CartState {
  cart: ProductType[];
}

// Define the initial state using that type
const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductType>) => {
      const item = state.cart.find(
        (product) => product.id === action.payload.id,
      );

      if (item) {
        item.count += action.payload.count;
      } else {
        state.cart.push(action.payload);
      }
    },
    incrementCount: (state, action: PayloadAction<number>) => {
      const item = state.cart.find((product) => product.id === action.payload);

      if (item) {
        item.count++;
      }
    },
    // A product at a count of 1 leaves the cart entirely rather than dropping to 0.
    decrementCount: (state, action: PayloadAction<number>) => {
      const itemIndex = state.cart.findIndex(
        (product) => product.id === action.payload,
      );

      if (itemIndex === -1) return;

      if (state.cart[itemIndex].count > 1) {
        state.cart[itemIndex].count--;
      } else {
        state.cart.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, incrementCount, decrementCount, clearCart } =
  cartSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.cart.cart;

// Exported on its own so components that gate on hydration can total the list
// they actually render, rather than the store's pre-hydration contents.
export const getCartTotal = (items: ProductType[]) =>
  items.reduce((total, product) => total + product.price * product.count, 0);

export const selectCartTotal = (state: RootState) =>
  getCartTotal(state.cart.cart);

// Units in the cart, not distinct products: three of one headphone counts as 3.
export const getCartCount = (items: ProductType[]) =>
  items.reduce((count, product) => count + product.count, 0);

export default cartSlice.reducer;
