const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware - FIXED CORS SETTINGS
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5000'],
  credentials: true
}));
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'EcoFinds Backend is running!' });
});

// Temporary in-memory data for testing
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

// Simple products API (no database needed yet)
app.get('/api/products', (req, res) => {
  res.json({
    message: 'Products retrieved successfully',
    products: products
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json({
    message: 'Product retrieved successfully',
    product: product
  });
});

app.post('/api/products', (req, res) => {
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

// Simple auth endpoints (no database needed yet)
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  // Simulate user creation
  const user = {
    id: Date.now(),
    name,
    email,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    message: 'User registered successfully',
    user: user,
    token: 'demo-token-' + Date.now()
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simulate user login
  const user = {
    id: 1,
    name: 'Demo User',
    email: email
  };
  
  res.json({
    message: 'Login successful',
    user: user,
    token: 'demo-token-' + Date.now()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {  // ADD '0.0.0.0' here
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🛒 Products: http://localhost:${PORT}/api/products`);
  console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
  console.log(`🌐 Accessible from: http://127.0.0.1:${PORT} and http://localhost:${PORT}`);
});