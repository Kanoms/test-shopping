import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useCart } from "../context/UseCart";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const {
    totalItems,
    cart,
    totalPrice,
    clearCart,
    removeFromCart,
    updateQuantity,
  } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const cartButtonRef = useRef(null);

  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (Event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(Event.target) &&
      !cartButtonRef.current.contains(Event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      document.addEventListener("focusin", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("focusin", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("focusin", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div>
      <div className="topnav bg-slate-900 text-white">
        <ul className="px-10 flex justify-between items-center">
          <li>Welcome to Test & Get the best product</li>
          <li>{getCurrentDate()}</li>
        </ul>
      </div>
      <div className="border border-b-0 border-black py-5">
        <ul className="px-10 flex justify-between items-center text-3xl">
          <li>
            Test <span className="text-red-600 text-4xl">.</span>
          </li>
          <button
            ref={cartButtonRef}
            onClick={handleDropdownToggle}
            className="relative"
          >
            <CiShoppingCart />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-sm w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </ul>
      </div>
      <div className="mainnav text-xl py-4 border border-black">
        <ul className="flex gap-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="cart-dropdown fixed overflow-y-scroll h-full block right-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10"
        >
          <div className="p-4 flex flex-col">
            <h3 className="text-lg font-bold">Shopping Cart</h3>
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="py-2 relative flex justify-between items-center"
                >
                  <div className="flex items-center flex-col w-[20%]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-auto object-cover"
                    />
                    <div className="flex items-center text-lg mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                        className="w-10 h-10 bg-blue-950 flex items-center justify-center text-white rounded-l"
                      >
                        -
                      </button>
                      <span className="w-10 h-10 flex items-center justify-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-10 h-10 bg-blue-950 flex items-center justify-center text-white rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="ml-2 text-right">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-xl absolute right-0 top-0"
                    >
                      <MdCancel />
                    </button>
                    <p className="text-2xl">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">
                  Total: ${totalPrice.toFixed(2)}
                </p>

                <button
                  onClick={clearCart}
                  className="block text-center bg-red-500 text-white text-xl p-3 rounded-full mt-2"
                >
                  <FaRegTrashAlt />
                </button>
              </div>

              <Link
                to="/checkout"
                className="block text-center bg-blue-500 text-white py-2 rounded mt-2"
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
