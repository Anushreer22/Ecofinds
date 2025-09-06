import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';
import { ProductsProvider, useProducts } from './contexts/ProductsContext';
import Navbar from './components/layout/Navbar';
import ProductCard from './components/products/ProductCard';
import Cart from './pages/products/Cart';
import AddProduct from './pages/products/AddProduct';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProductDetail from './pages/products/ProductDetail';

// Home component with ALL features: Search, Filter, Sort, Price Range
function HomePage() {
  const { state } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Filter products based on search, category, and price range
  const filteredProducts = state.products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesMinPrice = minPrice === '' || product.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === '' || product.price <= parseFloat(maxPrice);
    
    return matchesSearch && matchesCategory && matchesMinPrice && matchesMaxPrice;
  });

  // Sort products based on selection
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
      case 'oldest':
        return a.id - b.id;
      case 'name-asc':
        return a.title.localeCompare(b.title);
      case 'name-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSortBy('newest');
    setMinPrice('');
    setMaxPrice('');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-8 text-green-800">
        Sustainable Finds ♻️
      </h1>
      
      {/* Advanced Search, Filter, and Sort Section */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          {/* Search Input */}
          <div className="lg:col-span-2">
            <label className="block text-gray-700 font-semibold mb-2">Search Products</label>
            <input 
              type="text" 
              placeholder="🔍 Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          
          {/* Category Filter */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="All">All Categories</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Sort Options */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-2">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Min Price</label>
              <input
                type="number"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Max Price</label>
              <input
                type="number"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {sortedProducts.length} of {state.products.length} products
          </p>
          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600 text-lg mb-2">No products found matching your criteria.</p>
          <p className="text-sm text-gray-500">Try adjusting your search or filters.</p>
          <button
            onClick={clearFilters}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

// Profile Page (Placeholder)
function ProfilePage() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">My Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">Profile page coming soon...</p>
      </div>
    </div>
  );
}

// My Listings Page (Placeholder)
function MyListingsPage() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">My Listings</h2>
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">Your listed products will appear here.</p>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <UserProvider>
      <ProductsProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-green-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/my-listings" element={<MyListingsPage />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </ProductsProvider>
    </UserProvider>
  );
}

export default App;