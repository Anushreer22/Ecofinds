import { useCart } from '../../contexts/CartContext';
import { formatINR } from '../../utils/currencyFormatter';

const Cart = () => {
  const { state, dispatch } = useCart();

  const removeFromCart = (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const total = state.items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-green-800 mb-6">🛒 Shopping Cart</h2>
      
      {state.items.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty</p>
      ) : (
        <div>
          {state.items.map(item => (
            <div key={item.id} className="bg-white border border-green-200 rounded-lg p-4 mb-4 shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg text-green-800">{item.title}</h3>
                  <p className="text-green-600 font-bold">{formatINR(item.price)}</p>
                  <p className="text-gray-600 text-sm">{item.category}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 mt-6">
            <h3 className="text-xl font-bold text-green-800">
              Total: {formatINR(total)}
            </h3>
            <button className="mt-3 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;