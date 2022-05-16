import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./reducers/cartSlice";
import modalSlice from "./reducers/modalSlice";
// ...

const store = configureStore({
  reducer: { cart: cartSlice, modal: modalSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
