import React, { useState } from 'react';
import styles from './Products.module.scss';
import ProductCard from './ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: number;
  image: string;
  title: string;
  price: string;
  rating: number;
};

type ProductTableProps = {
  products: Product[];
  itemsPerPage: number;
};

const ProductTable: React.FC<ProductTableProps> = ({ products, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const getPaginationGroup = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    let pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.productTable}>
      <div className={styles.cardGrid}>
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            rating={product.rating}
            onClick={() => navigate(`/products/${product.id}`)}
          />
        ))}
      </div>

      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button onClick={() => goToPage(currentPage - 1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}

        {currentPage > 3 && <span>...</span>}

        {getPaginationGroup().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => goToPage(pageNumber)}
            className={currentPage === pageNumber ? styles.activePage : ''}
          >
            {pageNumber}
          </button>
        ))}

        {currentPage < totalPages - 2 && <span>...</span>}

        {currentPage < totalPages && (
          <button onClick={() => goToPage(currentPage + 1)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductTable;
