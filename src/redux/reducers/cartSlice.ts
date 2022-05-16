import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { CartItem } from "../../types";
import { RootState } from "../store";

interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
  loading: boolean;
  errorMessage: string;
}

interface MyKnownError {
  errorMessage: string;
  // ...
}

const initialState: CartState = {
  cartItems: [],
  amount: 0,
  total: 0,
  loading: false,
  errorMessage: "",
};

const url = "https://course-api.com/react-useReducer-cart-projects";

export const getCartItem = createAsyncThunk<
  CartItem[],
  undefined,
  {
    rejectValue: MyKnownError;
  }
>("cart/getItem", async (name, thunkAPI) => {
  // try {
  //   const response = await axios(url);

  //   return response.data;
  // } catch (error) {
  //   return thunkAPI.rejectWithValue((await response.json()) as MyKnownError);
  // }

  const response = await axios(url);

  console.log(response.status);

  if (response.status === 400) {
    // Return the known error for future handling
    return thunkAPI.rejectWithValue(response.data as MyKnownError);
  }

  return response.data as CartItem[];
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, { payload }: PayloadAction<string>) => {
      const itemId = payload;
      state.cartItems = state.cartItems.filter((cart) => cart.id !== itemId);
    },
    increaseCartAmount: (state, { payload }: PayloadAction<string>) => {
      const cart = state.cartItems.find((cart) => cart.id === payload);

      if (cart) {
        cart.amount = cart.amount + 1;
      }
    },
    decreaseCartAmount: (state, { payload }: PayloadAction<string>) => {
      const cart = state.cartItems.find((cart) => cart.id === payload);

      if (cart) {
        cart.amount = cart.amount - 1;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });

      state.amount = Math.floor(amount);
      state.total = Math.floor(total);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(getCartItem.rejected, (state, action) => {
        state.loading = false;

        if (action.error.message) {
          state.errorMessage = action.error.message;
        }
      });
  },
});

export const {
  clearCart,
  calculateTotals,
  decreaseCartAmount,
  increaseCartAmount,
  removeItem,
} = cartSlice.actions;

export const selectCart = (store: RootState) => store.cart;

export default cartSlice.reducer;
