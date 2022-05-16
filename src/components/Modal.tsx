import { useAppDispatch } from "../hooks/reduxHooks";
import { clearCart } from "../redux/reducers/cartSlice";
import { closeModal } from "../redux/reducers/modalSlice";

interface ModalProps {}

const Modal: React.FC<ModalProps> = () => {
  const dispatch = useAppDispatch();

  const confirmOnclick = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };
  const closeModalButton = () => dispatch(closeModal());

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Remove all items from your shopping cart?</h4>
        <div className="btn-container">
          <button
            onClick={confirmOnclick}
            type="button"
            className="btn confirm-btn"
          >
            confirm
          </button>
          <button
            onClick={closeModalButton}
            type="button"
            className="btn clear-btn"
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
