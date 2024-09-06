import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Importa useSelector para obtener el estado global
import { RootState } from '../../redux/store'; // Asegúrate de importar correctamente el tipo RootState
import styles from './ProductsPage.module.scss';
import Navbar from '../../components/navbar/Navbar';
import Filter from '../../components/filter/Filter';
import ProductTable from '../../components/prodcuts/ProductTable';

type ProductFromAPI = {
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
};

type Product = {
  id: number;
  title: string;
  price: string;
  image: string;
  rating: number;
  description: string;
};

const Products: React.FC = () => {
  const productsFromState = useSelector((state: RootState) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  console.log(productsFromState);
  

  useEffect(() => {
    const handleFilterProducts = () => {
      let filtered = productsFromState;

      if (searchTerm) {
        filtered = filtered.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (category !== 'all') {
        filtered = filtered.filter((product) => product.category === category);
      }

      const transformed = filtered.map((product) => ({
        id: product.id,
        image: product.image,
        title: product.title,
        price: product.price,
        rating: product.rating.rate,
        description: product.description
      }));

      setFilteredProducts(transformed);
    };

    handleFilterProducts();
  }, [searchTerm, category, productsFromState]);

  const categories = Array.from(new Set(productsFromState.map(product => product.category)));

  const categoryOptions = [{ value: 'all', label: 'Todos' }, ...categories.map(cat => ({ value: cat, label: cat }))];

  return (
    <div>
      <Navbar name="José Manuel" />
      <div className={styles.contentPage}>
        <Filter
          categories={categoryOptions}
          onSearch={(searchTerm: string, category: string) => {
            setSearchTerm(searchTerm);
            setCategory(category);
          }}
        />
        <ProductTable products={filteredProducts} itemsPerPage={5} />
      </div>
    </div>
  );
};

export default Products;
