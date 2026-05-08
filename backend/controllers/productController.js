import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc    Fetch all products (with pagination & keyword search)
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const categoryFilter = req.query.category
    ? { category: { $regex: req.query.category, $options: 'i' } }
    : {};

  const filter = { ...keyword, ...categoryFilter };

  const count = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    description: 'Sample description',
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    if (!rating || !comment) {
      res.status(400);
      throw new Error('Please provide rating and comment');
    }

    product.reviews = product.reviews || [];

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get all reviews across all products
// @route   GET /api/products/reviews
// @access  Private/Admin
const getAllReviews = asyncHandler(async (req, res) => {
  const products = await Product.find({ 'reviews.0': { $exists: true } }).select('name reviews');

  const reviews = [];
  products.forEach((product) => {
    product.reviews.forEach((review) => {
      reviews.push({
        _id: review._id,
        productId: product._id,
        productName: product.name,
        name: review.name,
        rating: review.rating,
        comment: review.comment,
        createdAt: review.createdAt,
      });
    });
  });

  // Sort by newest first
  reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  res.json(reviews);
});

// @desc    Delete a review
// @route   DELETE /api/products/:productId/reviews/:reviewId
// @access  Private/Admin
const deleteReview = asyncHandler(async (req, res) => {
  const { productId, reviewId } = req.params;

  const product = await Product.findById(productId);

  if (product) {
    const reviewIndex = product.reviews.findIndex(
      (r) => r._id.toString() === reviewId.toString()
    );

    if (reviewIndex === -1) {
      res.status(404);
      throw new Error('Review not found');
    }

    product.reviews.splice(reviewIndex, 1);

    product.numReviews = product.reviews.length;

    if (product.numReviews > 0) {
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
    } else {
      product.rating = 0;
    }

    await product.save();
    res.json({ message: 'Review deleted successfully' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});


export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getAllReviews,
  deleteReview,
};
