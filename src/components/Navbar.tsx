import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { CartIcon } from "../icons";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { amount } = useAppSelector((store) => store.cart);

  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
