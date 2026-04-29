// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ShoppingBag, Users, Package, Check, X, Pencil, Trash2, Plus } from 'lucide-react';
// import {
//   useGetProductsQuery,
//   useCreateProductMutation,
//   useDeleteProductMutation,
// } from '../store/slices/productsApiSlice';
// import { useGetOrdersQuery } from '../store/slices/ordersApiSlice';
// import { useGetUsersQuery, useDeleteUserMutation } from '../store/slices/usersApiSlice';
// import Loader from '../components/Loader';
// import { toast } from '../utils/toast';

// const TABS = ['Products', 'Orders', 'Users'];

// const AdminDashboardPage = () => {
//   const [tab, setTab] = useState('Products');
//   const [pageNumber] = useState(1);

//   const { data: productsData, isLoading: prodLoading, refetch: refetchProducts } = useGetProductsQuery({ keyword: '', pageNumber });
//   const { data: orders, isLoading: ordLoading } = useGetOrdersQuery();
//   const { data: users, isLoading: usersLoading, refetch: refetchUsers } = useGetUsersQuery();

//   const [createProduct, { isLoading: creating }] = useCreateProductMutation();
//   const [deleteProduct] = useDeleteProductMutation();
//   const [deleteUser] = useDeleteUserMutation();

//   const createProductHandler = async () => {
//     if (!window.confirm('Create a new sample product?')) return;
//     try {
//       await createProduct().unwrap();
//       refetchProducts();
//       toast.success('Product created — go to Edit to update it!');
//     } catch (err) {
//       toast.error(err?.data?.message || 'Failed to create product');
//     }
//   };

//   const deleteProductHandler = async (id) => {
//     if (!window.confirm('Delete this product?')) return;
//     try {
//       await deleteProduct(id).unwrap();
//       refetchProducts();
//       toast.success('Product deleted');
//     } catch (err) {
//       toast.error(err?.data?.message || 'Failed to delete');
//     }
//   };

//   const deleteUserHandler = async (id) => {
//     if (!window.confirm('Delete this user?')) return;
//     try {
//       await deleteUser(id).unwrap();
//       refetchUsers();
//       toast.success('User deleted');
//     } catch (err) {
//       toast.error(err?.data?.message || 'Cannot delete user');
//     }
//   };

//   const stats = [
//     { label: 'Total Products', value: productsData?.products?.length ?? '—', icon: ShoppingBag, color: 'bg-indigo-50 text-indigo-600' },
//     { label: 'Total Orders', value: orders?.length ?? '—', icon: Package, color: 'bg-green-50 text-green-600' },
//     { label: 'Total Users', value: users?.length ?? '—', icon: Users, color: 'bg-purple-50 text-purple-600' },
//   ];

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

//       {/* Stats */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
//         {stats.map(({ label, value, icon: Icon, color }) => (
//           <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
//             <div className={`p-3 rounded-xl ${color}`}><Icon className="w-6 h-6" /></div>
//             <div>
//               <p className="text-2xl font-bold text-gray-800">{value}</p>
//               <p className="text-sm text-gray-500">{label}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-2 mb-6 border-b border-gray-200">
//         {TABS.map((t) => (
//           <button key={t} onClick={() => setTab(t)}
//             className={`px-5 py-2.5 text-sm font-medium transition-colors relative ${tab === t ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
//             {t}
//             {tab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t" />}
//           </button>
//         ))}
//       </div>

//       {/* Products Tab */}
//       {tab === 'Products' && (
//         <div>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="font-semibold text-gray-700">All Products</h2>
//             <button onClick={createProductHandler} disabled={creating}
//               className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60">
//               <Plus className="w-4 h-4" /> New Product
//             </button>
//           </div>
//           {prodLoading ? <Loader /> : (
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50 border-b border-gray-100">
//                   <tr>
//                     {['ID', 'Name', 'Price', 'Category', 'Stock', 'Actions'].map((h) => (
//                       <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-50">
//                   {productsData?.products?.map((p) => (
//                     <tr key={p._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-3 font-mono text-xs text-gray-400">{p._id.slice(-8)}</td>
//                       <td className="px-4 py-3 font-medium text-gray-800 max-w-[200px] truncate">{p.name}</td>
//                       <td className="px-4 py-3 font-medium text-indigo-600">${p.price}</td>
//                       <td className="px-4 py-3 text-gray-600">{p.category}</td>
//                       <td className="px-4 py-3">
//                         <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
//                           {p.countInStock}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3 flex items-center gap-2">
//                         <Link to={`/admin/product/${p._id}/edit`} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></Link>
//                         <button onClick={() => deleteProductHandler(p._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Orders Tab */}
//       {tab === 'Orders' && (
//         <div>
//           <h2 className="font-semibold text-gray-700 mb-4">All Orders</h2>
//           {ordLoading ? <Loader /> : (
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50 border-b border-gray-100">
//                   <tr>
//                     {['ID', 'User', 'Date', 'Total', 'Paid', 'Delivered', 'Actions'].map((h) => (
//                       <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-50">
//                   {orders?.map((o) => (
//                     <tr key={o._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-3 font-mono text-xs text-gray-400">{o._id.slice(-8)}</td>
//                       <td className="px-4 py-3 text-gray-700">{o.user?.name || 'Unknown'}</td>
//                       <td className="px-4 py-3 text-gray-600">{o.createdAt.substring(0, 10)}</td>
//                       <td className="px-4 py-3 font-medium text-indigo-600">${o.totalPrice}</td>
//                       <td className="px-4 py-3">
//                         {o.isPaid ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-400" />}
//                       </td>
//                       <td className="px-4 py-3">
//                         {o.isDelivered ? <Check className="w-4 h-4 text-green-500" /> : <X className="w-4 h-4 text-red-400" />}
//                       </td>
//                       <td className="px-4 py-3">
//                         <Link to={`/order/${o._id}`} className="text-indigo-600 hover:underline text-xs">Details</Link>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Users Tab */}
//       {tab === 'Users' && (
//         <div>
//           <h2 className="font-semibold text-gray-700 mb-4">All Users</h2>
//           {usersLoading ? <Loader /> : (
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//               <table className="w-full text-sm">
//                 <thead className="bg-gray-50 border-b border-gray-100">
//                   <tr>
//                     {['Name', 'Email', 'Admin', 'Actions'].map((h) => (
//                       <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-50">
//                   {users?.map((u) => (
//                     <tr key={u._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
//                       <td className="px-4 py-3 text-gray-600">{u.email}</td>
//                       <td className="px-4 py-3">
//                         {u.isAdmin ? <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">Admin</span>
//                           : <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">User</span>}
//                       </td>
//                       <td className="px-4 py-3 flex items-center gap-2">
//                         <Link to={`/admin/user/${u._id}/edit`} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
//                           <Pencil className="w-4 h-4" />
//                         </Link>
//                         {!u.isAdmin && (
//                           <button onClick={() => deleteUserHandler(u._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDashboardPage;
import { useState, useEffect } from 'react'; // ✅ useEffect added
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Users, Package, Check, X, Pencil, Trash2, Plus } from 'lucide-react';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../store/slices/productsApiSlice';
import { useGetOrdersQuery } from '../store/slices/ordersApiSlice';
import { useGetUsersQuery, useDeleteUserMutation } from '../store/slices/usersApiSlice';
import Loader from '../components/Loader';
import { toast } from '../utils/toast';

const TABS = ['Products', 'Orders', 'Users'];

const AdminDashboardPage = () => {
  const [tab, setTab] = useState('Products');
  const [pageNumber] = useState(1);

  const navigate = useNavigate();

  const { data: productsData, isLoading: prodLoading, refetch: refetchProducts } =
    useGetProductsQuery({ keyword: '', pageNumber });

  const { data: orders, isLoading: ordLoading } = useGetOrdersQuery();

  const { data: users, isLoading: usersLoading, refetch: refetchUsers } =
    useGetUsersQuery();

  const [createProduct, { isLoading: creating }] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [deleteUser] = useDeleteUserMutation();

  // IMPORTANT FIX: force refetch when coming back / tab change
  useEffect(() => {
    if (tab === 'Products') {
      refetchProducts();
    }
  }, [tab, refetchProducts]);

  const createProductHandler = async () => {
    // if (!window.confirm('Create a new sample product?')) return;

    try {
      const res = await createProduct().unwrap();
      navigate(`/admin/product/${res._id}/edit`);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to create product');
    }
  };

  const deleteProductHandler = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id).unwrap();
      refetchProducts();
      toast.success('Product deleted');
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete');
    }
  };

  const deleteUserHandler = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(id).unwrap();
      refetchUsers();
      toast.success('User deleted');
    } catch (err) {
      toast.error(err?.data?.message || 'Cannot delete user');
    }
  };

  const stats = [
    {
      label: 'Total Products',
      value: productsData?.products?.length ?? '—',
      icon: ShoppingBag,
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      label: 'Total Orders',
      value: orders?.length ?? '—',
      icon: Package,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Total Users',
      value: users?.length ?? '—',
      icon: Users,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex items-center gap-4">
            <div className={`p-3 rounded-xl ${color}`}><Icon className="w-6 h-6" /></div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2.5 text-sm font-medium transition-colors relative ${tab === t ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
            {t}
            {tab === t && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-t" />}
          </button>
        ))}
      </div>

      {/* Products Tab */}
      {tab === 'Products' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-gray-700">All Products</h2>
            <button onClick={createProductHandler} disabled={creating}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-60">
              <Plus className="w-4 h-4" /> New Product
            </button>
          </div>

          {prodLoading ? <Loader /> : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['ID', 'Name', 'Price', 'Category', 'Stock', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {productsData?.products?.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-400">{p._id.slice(-8)}</td>
                      <td className="px-4 py-3 font-medium text-gray-800 max-w-[200px] truncate">{p.name}</td>
                      <td className="px-4 py-3 font-medium text-indigo-600">₹{p.price}</td>
                      <td className="px-4 py-3 text-gray-600">{p.category}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${p.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {p.countInStock}
                        </span>
                      </td>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <Link to={`/admin/product/${p._id}/edit`} className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"><Pencil className="w-4 h-4" /></Link>
                        <button onClick={() => deleteProductHandler(p._id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;