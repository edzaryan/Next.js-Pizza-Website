import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CreateCartItemValues } from "../services/dto/cart.dto";
import { Api } from "../services/api-client";
import { getCartDetails } from "../lib";
import { CartStateItem } from "../lib/get-cart-details";

export interface CartState {
  items: CartStateItem[];
  error: boolean;
  loading: boolean;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  error: false,
  loading: false,
  totalAmount: 0
};

export const fetchCartItems = createAsyncThunk("cart/fetchCartItems", async () => {
  const data = await Api.cart.getCart();
  return getCartDetails(data);
});

export const updateItemQuantity = createAsyncThunk(
  "cart/updateItemQuantity",
  async ({ id, quantity }: { id: number; quantity: number }) => {
    const data = await Api.cart.updateItemQuantity(id, quantity);
    return getCartDetails(data);
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (values: CreateCartItemValues) => {
    const data = await Api.cart.addCartItem(values);
    return getCartDetails(data);
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id: number) => {
    const data = await Api.cart.removeCartItem(id);
    return getCartDetails(data);
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchCartItems.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload.items;
      state.totalAmount = action.payload.totalAmount;
    });
    builder.addCase(fetchCartItems.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    // Add, Update, Remove
    builder
      .addCase(addCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItemQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCartItem.pending, (state) => {
        state.loading = true;
      });

    builder
      .addMatcher(
        (action) =>
          [addCartItem.fulfilled.type, updateItemQuantity.fulfilled.type, removeCartItem.fulfilled.type]
            .includes(action.type),
            (state, action: PayloadAction<{ items: CartStateItem[]; totalAmount: number }>) => {
                state.loading = false;
                state.error = false;
                state.items = action.payload.items;
                state.totalAmount = action.payload.totalAmount;
            }
      )
      .addMatcher(
        (action) =>
          [addCartItem.rejected.type, updateItemQuantity.rejected.type, removeCartItem.rejected.type]
            .includes(action.type),
            (state) => {
                state.loading = false;
                state.error = true;
            }
      );
  },
});

export default cartSlice.reducer;
