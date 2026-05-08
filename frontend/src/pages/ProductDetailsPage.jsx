import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../store/slices/productsApiSlice';
import { addToCart } from '../store/slices/cartSlice';
import Loader from '../components/Loader';
import Rating from '../components/Rating';
import { toast } from '../utils/toast';

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      toast.success('Review Submitted');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };

  const buyNowHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/checkout');
  };

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <p className="text-red-500 text-xl">
          {error?.data?.message || 'Product not found'}
        </p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:underline">
          ← Back to home
        </Link>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Link
        to="/"
        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="rounded-2xl overflow-hidden shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full object-cover h-96"
          />
        </div>

        <div>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
            {product.category}
          </span>

          <h1 className="text-3xl font-bold text-gray-900 mt-3 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </div>

          <p className="text-4xl font-extrabold text-indigo-600 mt-4 mb-4">
            ₹{product.price}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          <div className="bg-gray-50 rounded-xl p-5 space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Brand</span>
              <span className="font-medium">{product.brand}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status</span>
              <span
                className={`font-medium ${
                  product.countInStock > 0 ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex justify-between text-sm items-center">
                <span className="text-gray-500">Quantity</span>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  {[...Array(Math.min(product.countInStock, 10)).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-semibold transition-colors border border-indigo-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <button
              onClick={buyNowHandler}
              disabled={product.countInStock === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Reviews List */}
          <div>
            {(!product.reviews || product.reviews.length === 0) && <div className="bg-indigo-50 text-indigo-600 p-4 rounded-xl">No Reviews</div>}
            <div className="space-y-6">
              {product.reviews && product.reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <strong className="text-gray-900">{review.name}</strong>
                    <span className="text-sm text-gray-500">{review.createdAt.substring(0, 10)}</span>
                  </div>
                  <Rating value={review.rating} />
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Write a Review */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Write a Customer Review</h3>

            {loadingProductReview && <Loader />}

            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                  <textarea
                    id="comment"
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  ></textarea>
                </div>
                <button
                  disabled={loadingProductReview}
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors disabled:opacity-50"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="bg-gray-50 p-4 rounded-xl text-gray-600">
                Please <Link to="/login" className="text-indigo-600 font-semibold hover:underline">sign in</Link> to write a review
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;