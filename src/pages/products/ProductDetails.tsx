import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './ProductsPage.module.scss';
import Button from '../../atoms/button/Button';

const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id === Number(id))
  );

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  console.log(product);
  

  return (
    <div className={styles.containerPageDetails}>
      <div className={styles.productDetailContainer}>
        <h2>{product.title}</h2>
        <div className={styles.textProductContainer}>
          <img src={product.image} alt={product.title} style={{ width: '200px', height: '200px' }} />
          <div>
            <p><b>Precio:</b> ${product.price}</p>
            <p><b>Rating:</b> {product.rating.rate} estrellas</p>
            <p><b>Categoría:</b> {product.category}</p>
            <p><b>Descripción:</b> {product.description}</p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button variant='secondary' onClick={() => navigate('/products')}>Regresar</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
