import { useCart } from "../context/UseCart";

const Checkout = () => {
  const { cart, totalPrice, removeFromCart } = useCart();

  return (
    <div className="checkout-page container mx-auto p-4 h-screen flex flex-col justify-center">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div
            key={item.id}
            className="cart-item flex items-center mb-4 p-4 border-b"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-auto object-cover"
            />
            <div className="item-details ml-4 flex flex-col">
              <h2 className="text-lg font-semibold">{item.title}</h2>
              <p className="text-gray-600">Price: ${item.price}</p>
              <div className="flex items-center mt-2 text-gray-600">
                Quantity: {item.quantity}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
            <p className="item-total-price text-gray-800 font-semibold">
              ${item.price * item.quantity}
            </p>
          </div>
        ))}
      </div>
      <div className="total-price mt-4 text-right">
        <h2 className="text-xl font-bold">Total: ${totalPrice}</h2>
      </div>
    </div>
  );
};

export default Checkout;
