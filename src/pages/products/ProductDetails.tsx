import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((product) => product.id === Number(id))
  );

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  console.log(product);
  

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} style={{ width: '200px', height: '200px' }} />
      <p>Precio: ${product.price}</p>
      <p>Rating: {product.rating.rate} estrellas</p>
      <p>Categoría: {product.category}</p>
      <p>Descripción: {product.description}</p>
    </div>
  );
};

export default ProductDetails;
