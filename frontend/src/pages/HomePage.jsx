import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useGetProductsQuery } from '../store/slices/productsApiSlice';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const categories = [
    { label: 'All', icon: '🛒' },
    // { label: 'Mobiles', icon: '📱' },
    { label: 'Fashion', icon: '👗' },
    { label: 'Beauty', icon: '💄' },
    { label: 'Electronics', icon: '💻' },
    // { label: 'Toys', icon: '🧸' },
    // { label: 'Books', icon: '📚' },
    // { label: 'Furniture', icon: '🛋️' },
  ];

  const activeCategory_ = activeCategory !== 'All' ? activeCategory : undefined;
  //  ~line 32
const { data, isLoading, error } = useGetProductsQuery({
  keyword,
  pageNumber,
  category: activeCategory_,
});

  // All products for suggestions (fetch without keyword filter)
  const { data: allData } = useGetProductsQuery({ keyword: '', pageNumber: 1 });

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestions based on input
  const suggestions = searchInput.trim().length > 0
    ? (allData?.products || [])
        .filter((p) => p.name.toLowerCase().includes(searchInput.toLowerCase()))
        .slice(0, 6)
    : [];

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveCategory('All');
    setKeyword(searchInput);
    setPageNumber(1);
    setShowSuggestions(false);
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setKeyword('');
    setSearchInput('');
    setPageNumber(1);
  };

  const handleSuggestionClick = (name) => {
    setSearchInput(name);
    setKeyword(name);
    setPageNumber(1);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Discover Premium <span className="text-indigo-400">Products</span>
          </h1>
          <p className="text-gray-300 text-lg mb-8">Shop the best electronics, gadgets and more — shipped fast to your door.</p>
          <div ref={searchRef} className="relative max-w-md mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full px-4 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-400 border border-white/20"
                  value={searchInput}
                  onChange={(e) => { setSearchInput(e.target.value); setShowSuggestions(true); }}
                  onFocus={() => setShowSuggestions(true)}
                  onKeyDown={(e) => e.key === 'Escape' && setShowSuggestions(false)}
                  autoComplete="off"
                />
                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100">
                    {suggestions.map((product) => (
                      <li key={product._id}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(product.name)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors text-sm"
                        >
                          <img src={product.image} alt="" className="w-8 h-8 object-cover rounded-lg flex-shrink-0" />
                          <span className="truncate">{product.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-5 py-3 rounded-xl transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center overflow-x-auto scrollbar-hide py-4 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => handleCategoryClick(cat.label)}
                className={`flex flex-col items-center flex-1 min-w-[100px] px-2 py-3 rounded-2xl transition-all text-xs font-semibold whitespace-nowrap gap-2 ${
                  activeCategory === cat.label
                    ? 'text-indigo-600 bg-indigo-50 shadow-sm border border-indigo-100'
                    : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
                }`}
              >
                <span className="text-3xl mb-1 filter drop-shadow-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {activeCategory !== 'All' ? activeCategory : keyword ? `Results for "${keyword}"` : 'Latest Products'}
          </h2>
        </div>

        {error && !data &&(
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error?.data?.message || 'Failed to load products. Is the backend running?'}
          </div>
        )}

        {/* // ~line 122 */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {isLoading ? (
    <p className="col-span-full text-center">Loading...</p>
  ) : data?.products?.length > 0 ? (
    data.products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))
  ) : (
    <p className="col-span-full text-center">No Products Found</p>
  )}
</div>

        {/* Pagination */}
        {data && data.pages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {/* {Array.from({ length: data.pages }, (_, i) => i + 1).map((p) => ( */}
            {Array.from({ length: Math.min(data.pages, 5) }, (_, i) => i + 1).map((p) =>(
              <button
                key={p}
                onClick={() => setPageNumber(p)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                  p === pageNumber
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;