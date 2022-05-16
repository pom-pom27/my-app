import React from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { ChevronDown, ChevronUp } from "../icons";
import {
  decreaseCartAmount,
  increaseCartAmount,
  removeItem,
} from "../redux/reducers/cartSlice";

interface CartItemProps {
  id: string;
  img: string;
  title: string;
  price: number;
  amount: number;
}

const CartItem: React.FC<CartItemProps> = ({
  img,
  title,
  price,
  amount,
  id,
}) => {
  const dispatch = useAppDispatch();

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        {/* remove button */}
        <button onClick={() => dispatch(removeItem(id))} className="remove-btn">
          remove
        </button>
      </div>
      <div>
        {/* increase amount */}
        <button
          onClick={() => dispatch(increaseCartAmount(id))}
          className="amount-btn"
        >
          <ChevronUp />
        </button>
        {/* amount */}
        <p className="amount">{amount}</p>
        {/* decrease amount */}
        <button
          onClick={() => {
            if (amount === 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(decreaseCartAmount(id));
          }}
          className="amount-btn"
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
};

export default CartItem;
