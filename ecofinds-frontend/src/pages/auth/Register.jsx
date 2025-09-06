import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validations
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Simulate registration API call
    try {
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        joinedDate: new Date().toLocaleDateString()
      };
      
      register(userData);
      alert('Registration successful! 🎉\nWelcome to EcoFinds!');
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center py-8">
      <div className="container mx-auto p-4 max-w-md">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-600 text-white p-6 text-center">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-green-100 mt-2">Join the sustainable shopping community</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                required
              />
            </div>

            {/* Email Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min 6 characters)"
                className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full p-4 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>

            {/* Divider */}
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-600">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="text-green-600 hover:text-green-700 font-semibold underline"
              >
                Login here
              </Link>
            </p>
          </form>

          {/* Footer */}
          <div className="bg-green-50 p-4 text-center">
            <p className="text-sm text-gray-600">
              By creating an account, you agree to our{' '}
              <a href="#" className="text-green-600 hover:text-green-700">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-green-600 hover:text-green-700">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;