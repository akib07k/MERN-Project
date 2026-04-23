import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CheckCircle, XCircle, Package, Edit3, Save, X } from 'lucide-react';
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
  useCancelOrderMutation,
  useDeleteOrderMutation,
  useUpdateOrderAddressMutation
} from '../store/slices/ordersApiSlice';
import Loader from '../components/Loader';
import { toast } from '../utils/toast';

const OrderPage = () => {
  const { id } = useParams();
  const { userInfo } = useSelector((s) => s.auth);
  const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(id);
  const navigate = useNavigate();

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [deliverOrder, { isLoading: delivering }] = useDeliverOrderMutation();
  const [executeCancel, { isLoading: cancelling }] = useCancelOrderMutation();
  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();
  const [updateAddress, { isLoading: updatingAddress }] = useUpdateOrderAddressMutation();

  useEffect(() => {
    if (order) {
      setAddress(order.shippingAddress.address);
      setCity(order.shippingAddress.city);
      setPostalCode(order.shippingAddress.postalCode);
      setCountry(order.shippingAddress.country);
    }
  }, [order]);

  const updateAddressHandler = async () => {
    try {
      await updateAddress({
        orderId: id,
        address: { address, city, postalCode, country }
      }).unwrap();
      setIsEditingAddress(false);
      refetch();
      toast.success('Address updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || 'Error updating address');
    }
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(id).unwrap();
      refetch();
      toast.success('Order marked as delivered!');
    } catch (err) {
      toast.error(err?.data?.message || 'Error');
    }
  };

  const cancelHandler = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancelHandler = async () => {
    console.log('Initiating cancellation for order:', id);
    try {
      const res = await executeCancel(id).unwrap();
      console.log('Cancellation successful:', res);
      refetch();
      toast.success('Order cancelled successfully!');
      setShowCancelConfirm(false);
    } catch (err) {
      console.error('Cancellation failed:', err);
      toast.error(err?.data?.message || err.error || 'Failed to cancel order');
    }
  };

  const deleteHandler = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteHandler = async () => {
    console.log('Initiating deletion for order:', id);
    try {
      await deleteOrder(id).unwrap();
      console.log('Order deleted successfully');
      toast.success('Order deleted!');
      navigate('/profile');
    } catch (err) {
      console.error('Deletion failed:', err);
      toast.error(err?.data?.message || err.error || 'Error deleting order');
    }
  };

  if (isLoading) return <Loader />;
  if (error) return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center text-red-500">
      {error?.data?.message || 'Order not found'}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Package className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
          <p className="text-xs text-gray-400 font-mono">{order._id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Shipping */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-gray-800">Shipping</h2>
              {!order.isDelivered && !order.isCancelled && (
                <button
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  {isEditingAddress ? <><X className="w-3 h-3" /> Cancel</> : <><Edit3 className="w-3 h-3" /> Edit Address</>}
                </button>
              )}
            </div>

            {isEditingAddress ? (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  onClick={updateAddressHandler}
                  disabled={updatingAddress}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-2 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {updatingAddress ? 'Updating...' : <><Save className="w-4 h-4" /> Save Address</>}
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600">{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}</p>
                <div className={`mt-4 pt-4 border-t border-gray-50 ${order.isCancelled ? 'text-red-500' : 'text-gray-700'}`}>
                  {order.isCancelled ? (
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <XCircle className="w-4 h-4" /> Cancelled on {order.cancelledAt?.substring(0, 10)}
                    </div>
                  ) : order.isDelivered ? (
                    <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                      <CheckCircle className="w-4 h-4" /> Delivered on {order.deliveredAt?.substring(0, 10)}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600 bg-indigo-50 w-fit px-3 py-1 rounded-full">
                        <Package className="w-4 h-4" />
                        Expected Delivery: {new Date(new Date(order.createdAt).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>

                      {/* Order Tracking Progress Bar */}
                      <div className="relative flex items-center justify-between w-full px-2">
                        {/* Progress Line Background */}
                        <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-100 -z-0"></div>
                        {/* Progress Line Active */}
                        <div className={`absolute top-4 left-0 h-0.5 bg-indigo-500 transition-all duration-500 -z-0 ${order.isDelivered ? 'w-full' : 'w-1/2'}`}></div>

                        {/* Step 1: Ordered */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold mt-2 text-gray-800 uppercase tracking-tighter">Ordered</span>
                          <span className="text-[9px] text-gray-400">{order.createdAt.substring(0, 10)}</span>
                        </div>

                        {/* Step 2: Shipped / In Transit */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${order.isDelivered ? 'bg-indigo-600 text-white' : 'bg-white border-2 border-indigo-500 text-indigo-600 animate-pulse'}`}>
                            {order.isDelivered ? <CheckCircle className="w-5 h-5" /> : <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>}
                          </div>
                          <span className={`text-[10px] font-bold mt-2 uppercase tracking-tighter ${order.isDelivered ? 'text-gray-800' : 'text-indigo-600'}`}>Shipped</span>
                          <span className="text-[9px] text-gray-400">In Transit</span>
                        </div>

                        {/* Step 3: Delivered */}
                        <div className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all ${order.isDelivered ? 'bg-green-600 text-white' : 'bg-white border-2 border-gray-200 text-gray-300'}`}>
                            {order.isDelivered ? <CheckCircle className="w-5 h-5" /> : <Package className="w-4 h-4" />}
                          </div>
                          <span className={`text-[10px] font-bold mt-2 uppercase tracking-tighter ${order.isDelivered ? 'text-green-600' : 'text-gray-400'}`}>Delivered</span>
                          <span className="text-[9px] text-gray-400">{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Pending'}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-800 mb-3">Payment</h2>
            <p className="text-sm text-gray-600 mb-2">Method: {order.paymentMethod}</p>
            {order.isPaid ? (
              <div className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 w-fit px-3 py-1.5 rounded-lg border border-green-100">
                <CheckCircle className="w-4 h-4" /> Paid on {order.paidAt?.substring(0, 10)}
              </div>
            ) : order.paymentMethod === 'Cash on Delivery' ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-indigo-600 bg-indigo-50 w-fit px-3 py-1.5 rounded-lg border border-indigo-100 shadow-sm">
                  <Package className="w-4 h-4" /> Payable ₹{order.totalPrice} at Delivery
                </div>
                <p className="text-[11px] text-gray-400 italic ml-1">Total amount includes all taxes and fees.</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm font-medium text-red-500 bg-red-50 w-fit px-3 py-1.5 rounded-lg border border-red-100">
                <XCircle className="w-4 h-4" /> Payment Pending
              </div>
            )}
          </div>

          {/* Items */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-bold text-gray-800 mb-4">Order Items</h2>
            <div className="space-y-3">
              {order.orderItems.map((item) => (
                <div key={item._id} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                  <Link to={`/product/${item.product}`} className="flex-1 text-sm text-indigo-600 hover:underline">{item.name}</Link>
                  <span className="text-sm text-gray-600">{item.qty} × ₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-fit">
          <h2 className="font-bold text-gray-800 mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>Items</span><span>₹{order.itemsPrice}</span></div>
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span>₹{order.shippingPrice}</span></div>
            <div className="flex justify-between text-gray-600"><span>Tax</span><span>₹{order.taxPrice}</span></div>
            <div className="flex justify-between font-bold text-gray-900 pt-2 border-t"><span>Total</span><span className="text-indigo-600">₹{order.totalPrice}</span></div>
          </div>

          {userInfo?.isAdmin && !order.isDelivered && !order.isCancelled && (
            <button onClick={deliverHandler} disabled={delivering}
              className="mt-5 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
              {delivering ? 'Updating...' : 'Mark as Delivered'}
            </button>
          )}

          {!order.isDelivered && !order.isCancelled && (
            <div className="mt-3">
              {showCancelConfirm ? (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  <p className="text-xs font-bold text-red-600 text-center">Are you sure you want to cancel this order?</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={confirmCancelHandler} 
                      disabled={cancelling}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                    >
                      {cancelling ? 'Processing...' : 'Yes, Cancel'}
                    </button>
                    <button 
                      onClick={() => setShowCancelConfirm(false)}
                      className="flex-1 bg-white border border-gray-200 text-gray-600 py-2 rounded-lg text-xs font-bold hover:bg-gray-50 transition-colors"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={cancelHandler} disabled={cancelling}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                  ✕ Cancel Order
                </button>
              )}
            </div>
          )}

          {order.isCancelled && (
            <>
              <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <XCircle className="w-4 h-4" /> Order Cancelled
              </div>
              {showDeleteConfirm ? (
                <div className="mt-3 bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <p className="text-xs font-bold text-gray-100 text-center">Delete this order permanently?</p>
                  <div className="flex gap-2">
                    <button 
                      onClick={confirmDeleteHandler} 
                      disabled={deleting}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-xs font-bold transition-colors disabled:opacity-50"
                    >
                      {deleting ? 'Processing...' : 'Delete Permanently'}
                    </button>
                    <button 
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 bg-gray-800 border border-gray-700 text-gray-400 py-2 rounded-lg text-xs font-bold hover:bg-gray-700 transition-colors"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              ) : (
                <button onClick={deleteHandler} disabled={deleting}
                  className="mt-3 w-full bg-gray-800 hover:bg-gray-900 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
                  {deleting ? 'Deleting...' : '🗑 Delete Order'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;