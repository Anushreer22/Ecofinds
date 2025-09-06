import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useUser } from '../../contexts/UserContext';

const Navbar = () => {
  const { state } = useCart();
  const { state: userState, logout } = useUser();

  const handleLogout = () => {
    logout();
    alert('Logged out successfully! 👋');
  };

  return (
    <nav className="bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          🌱 EcoFinds
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6 items-center">
          {/* Home Link */}
          <Link to="/" className="hover:text-green-200 transition-colors">
            Home
          </Link>

          {/* Sell Link - Only show if logged in */}
          {userState.isAuthenticated && (
            <Link to="/add-product" className="hover:text-green-200 transition-colors">
              Sell
            </Link>
          )}

          {/* Cart Link */}
          <Link to="/cart" className="hover:text-green-200 transition-colors flex items-center gap-1">
            🛒 Cart ({state.items.length})
          </Link>

          {/* User Section */}
          {userState.isAuthenticated ? (
            <div className="flex items-center gap-4">
              {/* Welcome Message */}
              <span className="text-green-200 text-sm">
                Welcome, {userState.user?.name}
              </span>
              
              {/* Profile Dropdown (can be added later) */}
              <div className="relative group">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer">
                  {userState.user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    <div className="px-3 py-2 text-gray-800 border-b">
                      <p className="font-semibold">{userState.user?.name}</p>
                      <p className="text-sm text-gray-600">{userState.user?.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      className="block px-3 py-2 text-gray-800 hover:bg-green-100 rounded"
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/my-listings" 
                      className="block px-3 py-2 text-gray-800 hover:bg-green-100 rounded"
                    >
                      My Listings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-100 rounded mt-2"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>

              {/* Simple Logout Button (alternative) */}
              <button 
                onClick={handleLogout}
                className="bg-green-700 hover:bg-green-800 px-3 py-1 rounded text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            /* Login/Register Links for non-authenticated users */
            <div className="flex space-x-4">
              <Link 
                to="/login" 
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-white text-green-600 hover:bg-green-100 px-4 py-2 rounded transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;