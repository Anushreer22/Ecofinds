const express = require('express');
const router = express.Router();

// Temporary in-memory storage for testing
let products = [
  {
    id: 1,
    title: "Vintage Wooden Chair",
    price: 2999,
    category: "Furniture",
    condition: "Good",
    description: "Solid wooden chair, perfect for reading nook",
    image: "https://picsum.photos/300/200?random=1"
  },
  {
    id: 2,
    title: "Wireless Headphones", 
    price: 1899,
    category: "Electronics",
    condition: "Like New",
    description: "Used only a few times, works perfectly",
    image: "https://picsum.photos/300/200?random=2"
  }
];

// GET all products
router.get('/', (req, res) => {
  res.json({
    message: 'Products retrieved successfully',
    products: products
  });
});

// GET single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({
    message: 'Product retrieved successfully',
    product: product
  });
});

// POST create new product (protected)
router.post('/', (req, res) => {
  const { title, price, category, condition, description, image } = req.body;
  
  const newProduct = {
    id: products.length + 1,
    title,
    price,
    category,
    condition,
    description,
    image: image || 'https://picsum.photos/300/200?random=' + (products.length + 1)
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    message: 'Product created successfully',
    product: newProduct
  });
});

module.exports = router;