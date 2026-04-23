// import { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { ArrowLeft, Save } from 'lucide-react';
// import {
//   useUpdateUserMutation,
//   useGetUserDetailsQuery,
// } from '../store/slices/usersApiSlice';
// import Loader from '../components/Loader';
// import { toast } from '../utils/toast';

// const UserEditPage = () => {
//   const { id: userId } = useParams();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [isAdmin, setIsAdmin] = useState(false);

//   const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);

//   const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user) {
//       setName(user.name);
//       setEmail(user.email);
//       setIsAdmin(user.isAdmin);
//     }
//   }, [user]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       await updateUser({ userId, name, email, isAdmin }).unwrap();
//       toast.success('User updated successfully');
//       refetch();
//       navigate('/admin');
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto px-4 py-10">
//       <Link to="/admin" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6">
//         <ArrowLeft className="w-4 h-4" /> Go Back
//       </Link>

//       <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-8">Edit User</h1>

//         {isLoading ? (
//           <Loader />
//         ) : error ? (
//           <div className="bg-red-50 text-red-700 p-4 rounded-xl">{error?.data?.message || 'Error loading user'}</div>
//         ) : (
//           <form onSubmit={submitHandler} className="space-y-6">
//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700">Name</label>
//               <input
//                 type="text"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700">Email Address</label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 id="isAdmin"
//                 className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
//                 checked={isAdmin}
//                 onChange={(e) => setIsAdmin(e.target.checked)}
//               />
//               <label htmlFor="isAdmin" className="text-sm font-medium text-gray-700 select-none">
//                 Is Admin
//               </label>
//             </div>

//             <button
//               type="submit"
//               disabled={loadingUpdate}
//               className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
//             >
//               <Save className="w-5 h-5" />
//               {loadingUpdate ? 'Updating...' : 'Update User'}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserEditPage;
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import {
  useUpdateUserMutation,
  useGetUserDetailsQuery,
} from '../store/slices/usersApiSlice';
import Loader from '../components/Loader';
import { toast } from '../utils/toast';

const UserEditPage = () => {
  const { id: userId } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  // 🔥 Fetch user details
  const {
    data: user,
    isLoading,
    error,
  } = useGetUserDetailsQuery(userId);

  // 🔥 Update mutation
  const [updateUser, { isLoading: loadingUpdate }] =
    useUpdateUserMutation();

  // 🔥 Fill form
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setIsAdmin(user.isAdmin || false);
    }
  }, [user]);

  // 🔥 Submit handler (FIXED)
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser({
        id: userId, // ✅ FIXED
        name,
        email,
        isAdmin,
      }).unwrap();

      toast.success('User updated successfully');

      navigate('/admin/userlist'); // ✅ better redirect
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Update failed');
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      
      {/* 🔙 BACK BUTTON */}
      <Link
        to="/admin/userlist"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Go Back
      </Link>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Edit User
        </h1>

        {/* 🔄 LOADING */}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl">
            {error?.data?.message || 'Error loading user'}
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">

            {/* NAME */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* ADMIN CHECK */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isAdmin"
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label
                htmlFor="isAdmin"
                className="text-sm font-medium text-gray-700 select-none"
              >
                Is Admin
              </label>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loadingUpdate}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {loadingUpdate ? 'Updating...' : 'Update User'}
            </button>

          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditPage;