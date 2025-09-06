import { useCart } from '../../contexts/CartContext';
import { formatINR } from '../../utils/currencyFormatter';

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
    alert(`${product.title} added to cart! 🛒`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-green-200 hover:shadow-lg transition-shadow">
      <img 
        src={product.image} 
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-green-800">{product.title}</h3>
        <p className="text-green-600 font-bold text-xl">{formatINR(product.price)}</p>
        <p className="text-gray-600">{product.category} • {product.condition}</p>
        <p className="text-sm text-gray-500 mt-2">{product.description}</p>
        <button 
          onClick={addToCart}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;