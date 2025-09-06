import { createContext, useContext, useReducer } from 'react';
import { sampleProducts } from '../data/products';

const ProductsContext = createContext();

const productsReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return { ...state, products: [...state.products, action.payload] };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, { 
    products: sampleProducts // Start with sample data
  });

  const addProduct = (product) => {
    // Generate a unique ID for the new product
    const newProduct = {
      ...product,
      id: Date.now(), // Simple unique ID
      image: product.image ? URL.createObjectURL(product.image) : 'https://picsum.photos/300/200?random=4'
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
  };

  return (
    <ProductsContext.Provider value={{ state, dispatch, addProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);