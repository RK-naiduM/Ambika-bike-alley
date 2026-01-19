const mongoose = require('mongoose');

// 1. The Schema for an individual review
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Links the review to a specific user
    },
  },
  {
    timestamps: true,
  }
);

// 2. The Main Product Schema
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    
    // Categories
    category: { 
      type: String, 
      required: true,
      enum: ['Bicycles', 'Accessories', 'Spare Parts'] 
    },
    subCategory: { type: String, required: true },
    targetAudience: { 
      type: String, 
      required: true, 
      enum: ['Men', 'Women', 'Kids', 'Unisex'],
      default: 'Unisex'
    },

    description: { type: String, required: true },
    
    // Specs (Optional)
    specs: {
       frame: { type: String },
       weight: { type: String },
       gear: { type: String },
    },

    // --- NEW: REVIEWS ARRAY ---
    reviews: [reviewSchema], // Stores a list of the review objects defined above

    // Stats
    rating: { type: Number, required: true, default: 0 }, // Average Rating
    numReviews: { type: Number, required: true, default: 0 }, // Total count

    price: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;