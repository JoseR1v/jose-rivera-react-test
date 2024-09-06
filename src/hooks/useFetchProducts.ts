import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/slices/productSlice"; // Importa la acción setProducts de Redux

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const useFetchProducts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Error fetching products');
        }

        const data: Product[] = await response.json();
        const transformedData = data.map(product => ({
          ...product,
          price: product.price.toString(), // Convertir el precio a string
        }));
        
        dispatch(setProducts(transformedData)); // Guardar los productos en Redux
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return { loading, error };
};

export default useFetchProducts;
