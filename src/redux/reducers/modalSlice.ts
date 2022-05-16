import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface modalState {
  isOpen: boolean;
}

const initialState: modalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;

export const selectModal = (store: RootState) => store.modal;

export default modalSlice.reducer;
