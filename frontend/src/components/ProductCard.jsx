// import { Link } from 'react-router-dom';
// // import Rating from './Rating';

// const ProductCard = ({ product }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
//       <Link to={`/product/${product._id}`}>
//         <div className="overflow-hidden h-52">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//           />
//         </div>
//       </Link>
//       <div className="p-4">
//         <Link to={`/product/${product._id}`}>
//           <h3 className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-2 mb-1">
//             {product.name}
//           </h3>
//         </Link>
//         {/* <Rating value={product.rating} text={`(${product.numReviews})`} /> */}
//         <div className="mt-3 flex items-center justify-between">
//           <span className="text-xl font-bold text-indigo-600">₹{product.price}</span>
//           <Link
//             to={`/product/${product._id}`}
//             className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
//           >
//             View
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import { Link } from 'react-router-dom';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100">
      <Link to={`/product/${product._id}`}>
        <div className="overflow-hidden h-52">
          <img
            src={
              product.image.startsWith('http')
                ? product.image
                : `http://localhost:8080${product.image}`
            }
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors line-clamp-2 mb-1">
            {product.name}
          </h3>
        </Link>
        <Rating value={product.rating} text={`(${product.numReviews})`} />
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xl font-bold text-indigo-600">₹{product.price}</span>
          <Link
            to={`/product/${product._id}`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;