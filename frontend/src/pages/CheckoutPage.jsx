import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Package } from 'lucide-react';
import { saveShippingAddress, savePaymentMethod, clearCartItems } from '../store/slices/cartSlice';
import { useCreateOrderMutation } from '../store/slices/ordersApiSlice';
import { toast } from '../utils/toast';

const steps = ['Shipping', 'Payment', 'Review'];

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, itemsPrice, taxPrice, shippingPrice, totalPrice, shippingAddress } = useSelector((s) => s.cart);
  const { userInfo } = useSelector((s) => s.auth);

  const [step, setStep] = useState(0);
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [paymentMethod, setPaymentMethod] = useState('Card');

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  if (!userInfo) {
    navigate('/login?redirect=/checkout', { replace: true });
    return null;
  }

  const shippingHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    setStep(1);
  };

  const paymentHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    setStep(2);
  };

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cartItems.filter(x => x !== null),
        shippingAddress: { address, city, postalCode, country },
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      toast.success('Order placed successfully!');
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to place order');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Progress Steps */}
      <div className="flex items-center mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i <= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {i + 1}
            </div>
            <span className={`ml-2 text-sm font-medium ${i <= step ? 'text-indigo-600' : 'text-gray-400'}`}>{s}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-4 ${i < step ? 'bg-indigo-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <form onSubmit={shippingHandler} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><MapPin className="w-5 h-5 text-indigo-600" /> Shipping Address</h2>
          {[
            { label: 'Street Address', state: address, setter: setAddress, ph: '123 Main St' },
            { label: 'City', state: city, setter: setCity, ph: 'New York' },
            { label: 'Postal Code', state: postalCode, setter: setPostalCode, ph: '10001' },
            { label: 'Country', state: country, setter: setCountry, ph: 'United States' },
          ].map(({ label, state, setter, ph }) => (
            <div key={label}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
              <input type="text" value={state} onChange={(e) => setter(e.target.value)} required placeholder={ph}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm" />
            </div>
          ))}
          <div className="flex gap-3">
            <button type="button" onClick={() => navigate('/cart')}
              className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
              ← Back to Cart
            </button>
            <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-colors">
              Continue to Payment
            </button>
          </div>
        </form>
      )}

      {step === 1 && (
        <form onSubmit={paymentHandler} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2"><CreditCard className="w-5 h-5 text-indigo-600" /> Payment Method</h2>
          {['Card', 'PayPal', 'Cash on Delivery'].map((m) => (
            <label key={m} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${paymentMethod === m ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input type="radio" name="payment" value={m} checked={paymentMethod === m} onChange={() => setPaymentMethod(m)} className="accent-indigo-600" />
              <span className="font-medium text-gray-800">{m}</span>
            </label>
          ))}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-800">
            ⚠️ This is a demo. No real payment will be processed.
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(0)} className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">Back</button>
            <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-colors">Review Order</button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6"><Package className="w-5 h-5 text-indigo-600" /> Order Review</h2>
          <div className="space-y-4 mb-8">
            {cartItems.filter(item => item !== null).map((item) => (
              <div key={item._id} className="flex items-center gap-6 p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl shadow-sm" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                </div>
                <span className="text-sm font-bold text-indigo-600">₹{(item.qty * item.price).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>Items</span><span>₹{itemsPrice}</span></div>
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span>₹{shippingPrice}</span></div>
            <div className="flex justify-between text-gray-600"><span>Tax</span><span>₹{taxPrice}</span></div>
            <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t"><span>Total</span><span className="text-indigo-600">₹{totalPrice}</span></div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">Back</button>
            <button onClick={placeOrderHandler} disabled={isLoading} className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition-colors">
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;