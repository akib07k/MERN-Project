import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Package, User, Clock } from 'lucide-react';
import { useProfileMutation } from '../store/slices/usersApiSlice';
import { useGetMyOrdersQuery, useDeleteOrderMutation } from '../store/slices/ordersApiSlice';
import { setCredentials } from '../store/slices/authSlice';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { toast } from '../utils/toast';

const ProfilePage = () => {
  const { userInfo } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [updateProfile, { isLoading }] = useProfileMutation();
  const { data: orders, isLoading: ordersLoading, refetch: refetchOrders } = useGetMyOrdersQuery();
  const [deleteOrder, { isLoading: deleting }] = useDeleteOrderMutation();

  const deleteOrderHandler = async (orderId) => {
    if (!window.confirm('Delete this order permanently?')) return;
    try {
      await deleteOrder(orderId).unwrap();
      refetchOrders();
      toast.success('Order deleted!');
    } catch (err) {
      toast.error(err?.data?.message || 'Error deleting order');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await updateProfile({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Edit */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" /> Edit Profile
          </h2>
          <form onSubmit={submitHandler} className="space-y-4">
            {[
              { label: 'Name', val: name, setter: setName, type: 'text' },
              { label: 'Email', val: email, setter: setEmail, type: 'email' },
              { label: 'New Password', val: password, setter: setPassword, type: 'password', ph: 'Leave blank to keep current' },
              { label: 'Confirm Password', val: confirmPassword, setter: setConfirmPassword, type: 'password' },
            ].map(({ label, val, setter, type, ph }) => (
              <div key={label}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                <input type={type} value={val} onChange={(e) => setter(e.target.value)} placeholder={ph || ''}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              </div>
            ))}
            <button type="submit" disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors">
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-5 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" /> Order History
          </h2>
          {ordersLoading ? <Loader /> : orders?.length === 0 ? (
            <div className="text-center py-10">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500">No orders yet.</p>
              <Link to="/" className="mt-3 inline-block text-indigo-600 hover:underline text-sm">Start shopping</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-500 text-left">
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Total</th>
                    <th className="pb-3 font-medium">Paid</th>
                    <th className="pb-3 font-medium">Delivered</th>
                    <th className="pb-3 font-medium"></th>
                    <th className="pb-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orders?.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 font-mono text-xs text-gray-500">{order._id.slice(-8)}</td>
                      <td className="py-3 text-gray-600">{order.createdAt.substring(0, 10)}</td>
                      <td className="py-3 font-medium">₹{order.totalPrice}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {order.isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {order.isDelivered ? 'Delivered' : 'Processing'}
                        </span>
                      </td>
                      <td className="py-3">
                        <Link to={`/order/${order._id}`} className="text-indigo-600 hover:underline text-xs">Details</Link>
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => deleteOrderHandler(order._id)}
                          disabled={deleting}
                          className="text-xs text-red-500 hover:text-red-700 hover:underline disabled:opacity-50 font-medium"
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;