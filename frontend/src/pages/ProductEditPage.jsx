import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, UploadCloud } from 'lucide-react';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation,
} from '../store/slices/productsApiSlice';
import Loader from '../components/Loader';
import { toast } from '../utils/toast';

const ProductEditPage = () => {
  const { id: productId } = useParams();

  const fileInputRef = useRef(null); // ✅ best practice

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } =
    useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: loadingUpload }] =
    useUploadProductImageMutation();

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
      navigate('/admin');
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
      <Link
        to="/admin"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Go Back
      </Link>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Edit Product
        </h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl">
            {error?.data?.message || 'Error loading product'}
          </div>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Image */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Product Image
                </label>

                {/* Preview */}
                {image && (
                  <div className="w-32 h-32 rounded-xl overflow-hidden border border-gray-200 mb-2">
                    <img
                      src={image.startsWith('http') ? image : `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}${image}`}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  </div>
                )}

                {/* URL input */}
                <input
                  type="text"
                  placeholder="Image URL"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />

                {/* Upload button */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={uploadFileHandler}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  disabled={loadingUpload}
                  className="flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-medium text-sm px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60"
                >
                  <UploadCloud className="w-4 h-4" />
                  {loadingUpload ? 'Uploading...' : 'Choose & Upload Image'}
                </button>
              </div>

              {/* Brand */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Brand
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Stock
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Description
              </label>
              <textarea
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Submit */}
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
