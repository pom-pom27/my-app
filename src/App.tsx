import { useEffect } from "react";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import {
  calculateTotals,
  getCartItem,
  selectCart,
} from "./redux/reducers/cartSlice";
import { selectModal } from "./redux/reducers/modalSlice";

function App() {
  const dispatch = useAppDispatch();

  const { cartItems } = useAppSelector(selectCart);
  const { loading } = useAppSelector((store) => store.cart);
  const { isOpen } = useAppSelector(selectModal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    dispatch(getCartItem());
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <>
      {isOpen && <Modal />}

      <Navbar />
      <CartContainer />
    </>
  );
}

export default App;
