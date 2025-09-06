import { useState, useRef } from 'react';
import { useProducts } from '../../contexts/ProductsContext';
import { productAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    condition: '',
    description: '',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData object for file upload
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('price', parseFloat(formData.price));
      submitData.append('category', formData.category);
      submitData.append('condition', formData.condition);
      submitData.append('description', formData.description);
      if (formData.image) {
        submitData.append('image', formData.image);
      }

      const response = await productAPI.create(submitData);
      
      const newProduct = {
        ...response.data,
        title: formData.title,
        price: parseFloat(formData.price),
        category: formData.category,
        condition: formData.condition,
        description: formData.description,
      };
      
      addProduct(newProduct);
      
      alert('Product listed successfully! 🎉\nIt will now appear on the homepage.');
      
      // Clear form
      setFormData({
        title: '', price: '', category: '', condition: '', description: '', image: null
      });
      setImagePreview(null);
      
      // Navigate to products page
      navigate('/products');
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to list product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const triggerCamera = () => {
    cameraInputRef.current?.click();
  };

  const removeImage = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-800">List Your Product</h2>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Product Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Product Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Vintage Wooden Chair"
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Price and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select Category</option>
              <option value="Furniture">Furniture</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Books">Books</option>
              <option value="Sports">Sports</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Condition */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Condition *</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your product in detail..."
            rows="4"
            className="w-full p-3 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Image Upload Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Product Image</label>
          
          {/* Hidden file inputs */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <input
            type="file"
            ref={cameraInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            capture="environment"
            className="hidden"
          />

          {imagePreview ? (
            // Image Preview
            <div className="text-center">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-48 h-48 object-cover rounded-lg mx-auto border-2 border-green-300"
              />
              <button
                type="button"
                onClick={removeImage}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove Image
              </button>
            </div>
          ) : (
            // Upload Options
            <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center">
              <p className="text-gray-600 mb-4">Choose how to add product image:</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Upload from Device */}
                <button
                  type="button"
                  onClick={triggerFileInput}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
                >
                  📁 Upload Photo
                </button>

                {/* Take Photo (Mobile Only) */}
                <button
                  type="button"
                  onClick={triggerCamera}
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
                >
                  📷 Take Photo
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Supported formats: JPG, PNG, WEBP up to 10MB
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Listing Product...' : 'List Product for Sale'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;