import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { openModal } from "../redux/reducers/modalSlice";
import CartItem from "./CartItem";

interface CartContainerProps {}

const CartContainer: React.FC<CartContainerProps> = () => {
  const { cartItems, amount, total } = useAppSelector((store) => store.cart);

  const dispatch = useAppDispatch();
  const clearOnClick = () => {
    dispatch(openModal());
  };

  return (
    <section className="cart">
      {amount < 1 ? (
        <header>
          <h2>Your Bag</h2>
          <h4 className="empty-cart">is Currently empty</h4>
        </header>
      ) : (
        <>
          <header>
            <h2>Your Bag</h2>
          </header>
          <div>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </div>
          <footer>
            <hr />
            <div className="cart-total">
              <h4>
                total <span>{total}</span>
              </h4>
            </div>
            <button className="btn clear-btn" onClick={clearOnClick}>
              Clear cart
            </button>
          </footer>
        </>
      )}
    </section>
  );
};
export default CartContainer;
