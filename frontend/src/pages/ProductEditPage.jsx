// import { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { ArrowLeft, Save } from 'lucide-react';
// import {
//   useUpdateProductMutation,
//   useGetProductDetailsQuery,
//   useUploadProductImageMutation,
// } from '../store/slices/productsApiSlice';
// import Loader from '../components/Loader';
// import { toast } from '../utils/toast';

// const ProductEditPage = () => {
//   const { id: productId } = useParams();

//   const [name, setName] = useState('');
//   const [price, setPrice] = useState(0);
//   const [image, setImage] = useState('');
//   const [brand, setBrand] = useState('');
//   const [category, setCategory] = useState('');
//   const [countInStock, setCountInStock] = useState(0);
//   const [description, setDescription] = useState('');

//   const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

//   const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
//   const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (product) {
//       setName(product.name);
//       setPrice(product.price);
//       setImage(product.image);
//       setBrand(product.brand);
//       setCategory(product.category);
//       setCountInStock(product.countInStock);
//       setDescription(product.description);
//     }
//   }, [product]);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       await updateProduct({
//         productId,
//         name,
//         price,
//         image,
//         brand,
//         category,
//         countInStock,
//         description,
//       }).unwrap();
//       toast.success('Product updated');
//       navigate('/admin');
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   const uploadFileHandler = async (e) => {
//     const formData = new FormData();
//     formData.append('image', e.target.files[0]);
//     try {
//       const res = await uploadProductImage(formData).unwrap();
//       toast.success(res.message);
//       setImage(res.image);
//     } catch (err) {
//       toast.error(err?.data?.message || err.error);
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-10">
//       <Link to="/admin" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6">
//         <ArrowLeft className="w-4 h-4" /> Go Back
//       </Link>

//       <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-8">Edit Product</h1>

//         {isLoading ? (
//           <Loader />
//         ) : error ? (
//           <div className="bg-red-50 text-red-700 p-4 rounded-xl">{error?.data?.message || 'Error loading product'}</div>
//         ) : (
//           <form onSubmit={submitHandler} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Name</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Enter name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Price</label>
//                 <input
//                   type="number"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Enter price"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Image URL</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
//                   placeholder="Enter image url"
//                   value={image}
//                   onChange={(e) => setImage(e.target.value)}
//                 />
//                 <input
//                   type="file"
//                   className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
//                   onChange={uploadFileHandler}
//                 />
//                 {loadingUpload && <div className="text-xs text-indigo-600 mt-1 italic">Uploading...</div>}
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Brand</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Enter brand"
//                   value={brand}
//                   onChange={(e) => setBrand(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Stock</label>
//                 <input
//                   type="number"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Enter stock"
//                   value={countInStock}
//                   onChange={(e) => setCountInStock(e.target.value)}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm font-semibold text-gray-700">Category</label>
//                 <input
//                   type="text"
//                   className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
//                   placeholder="Enter category"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-semibold text-gray-700">Description</label>
//               <textarea
//                 rows="4"
//                 className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loadingUpdate}
//               className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
//             >
//               <Save className="w-5 h-5" />
//               {loadingUpdate ? 'Updating...' : 'Update Product'}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductEditPage;
import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from '../store/slices/productsApiSlice';
import Loader from '../components/Loader';
import { toast } from '../utils/toast';

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        _id: productId, 
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();

      toast.success('Product updated');
      navigate('/admin'); // redirect back
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link to="/admin" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6">
        <ArrowLeft className="w-4 h-4" /> Go Back
      </Link>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Edit Product</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl">
            {error?.data?.message || 'Error loading product'}
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Price</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Image URL</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />

                <input
                  type="file"
                  className="text-xs text-gray-500"
                  onChange={uploadFileHandler}
                />

                {loadingUpload && <div className="text-xs text-indigo-600">Uploading...</div>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Brand</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Stock</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Description</label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loadingUpdate}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl"
            >
              <Save className="w-5 h-5" />
              {loadingUpdate ? 'Updating...' : 'Update Product'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditPage;