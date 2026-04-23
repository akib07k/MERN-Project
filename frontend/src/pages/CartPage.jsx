import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, itemsPrice, taxPrice, shippingPrice, totalPrice } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const updateQtyHandler = (item, delta) => {
    const newQty = item.qty + delta;
    if (newQty < 1 || newQty > item.countInStock) return;
    dispatch(addToCart({ ...item, qty: newQty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
        <Link to="/" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.filter(item => item !== null).map((item) => (
            <div key={item._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
              <div className="flex-1">
                <Link to={`/product/${item._id}`} className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
                  {item.name}
                </Link>
                <p className="text-indigo-600 font-bold mt-1">₹{item.price}</p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1">
                  <button onClick={() => updateQtyHandler(item, -1)} className="text-gray-500 hover:text-indigo-600"><Minus className="w-4 h-4" /></button>
                  <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                  <button onClick={() => updateQtyHandler(item, 1)} className="text-gray-500 hover:text-indigo-600"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={() => removeFromCartHandler(item._id)} className="text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({cartItems.filter(item => item !== null).reduce((a, c) => a + (c?.qty || 0), 0)} items)</span>
              <span>₹{itemsPrice}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shippingPrice === '0.00' ? 'Free' : `₹${shippingPrice}`}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (15%)</span>
              <span>₹{taxPrice}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-gray-900 text-base">
              <span>Total</span>
              <span className="text-indigo-600">₹{totalPrice}</span>
            </div>
          </div>
          <button
            onClick={checkoutHandler}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;