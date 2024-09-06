import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import { addProduct, updateProduct, deleteProduct as removeProduct } from '../../../redux/slices/productSlice'; // Importar acciones de Redux
import styles from '../User.module.scss';
import Modal from '../../../atoms/modal/Modal';
import Button from '../../../atoms/button/Button';
import { faPencil, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../../../atoms/input/Input';
import InputSelect from '../../../atoms/input-select/InputSelect';

type Product = {
  id: number;
  title: string;
  price: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
  image: string;
  description: string;
};

const ratingOptions = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

const categoryOptions = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Clothing', label: 'Clothing' },
  { value: 'Jewelry', label: 'Jewelry' },
];

const ProductList: React.FC = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    rating: '0',
    category: '',
    image: '',
    description: ''
  });

  const handleOpenAddModal = () => {
    setIsEditing(false);
    setNewProduct({ title: '', price: '', rating: '0', category: '', image: '', description: '' }); // Reiniciar el formulario
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          image: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProduct = () => {
    if (isEditing && currentProduct) {
      const updatedProduct = {
        ...currentProduct,
        ...newProduct,
        rating: { ...currentProduct.rating, rate: parseFloat(newProduct.rating) }
      };
      dispatch(updateProduct(updatedProduct));
    } else {
      const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const newProductToAdd: Product = {
        id: newId,
        title: newProduct.title,
        price: newProduct.price,
        rating: { rate: parseFloat(newProduct.rating), count: 0 },
        category: newProduct.category,
        image: newProduct.image,
        description: newProduct.description
      };
      dispatch(addProduct(newProductToAdd));
    }
    closeModal();
  };
  
  // Abrir modal para editar producto
  const handleEditProduct = (product: Product) => {
    setIsEditing(true); // Estamos en modo edición
    setCurrentProduct(product);
    setNewProduct({
      title: product.title,
      price: product.price,
      rating: String(product.rating.rate),
      category: product.category,
      image: product.image,
      description: product.description
    });
    setIsModalOpen(true); // Abrir el modal para editar
  };

  // Eliminar producto
  const handleDeleteProduct = (id: number) => {
    dispatch(removeProduct(id)); // Despachar la acción para eliminar el producto
  };

  // Actualizar inputs del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleRatingChange = (value: string) => {
    setNewProduct((prevProduct) => ({ ...prevProduct, rating: value }));
  };

  const handleCategoryChange = (value: string) => {
    setNewProduct((prevProduct) => ({ ...prevProduct, category: value }));
  };

  return (
    <div className={styles.ProductListContainer}>
      <h3>Gestión de Productos (CRUD)</h3>

      <div className={styles.buttonContainer}>
        <Button onClick={handleOpenAddModal}>
          <div className={styles.buttonContent}>
            <FontAwesomeIcon icon={faPlus} />
            Agregar producto
          </div>
        </Button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Rating</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.rating.rate}</td>
              <td>{product.category}</td>
              <td className={styles.buttonContainerTable}>
                <button className={styles.edit} onClick={() => handleEditProduct(product)}>
                  <FontAwesomeIcon icon={faPencil} />
                </button>
                <button className={styles.delete} onClick={() => handleDeleteProduct(product.id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para agregar/editar producto */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <div className={styles.modalContent}>
          <Input
            label="Nombre"
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleChange}
          />
          <Input
            label="Precio"
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
          />
          <InputSelect
            label="Rating"
            options={ratingOptions}
            value={newProduct.rating}
            onChange={handleRatingChange}
          />
          <InputSelect
            label="Categoría"
            options={categoryOptions}
            value={newProduct.category}
            onChange={handleCategoryChange}
          />
          <Input
            label="Descripción"
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
          />

          <Input
            label="Imagen"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {newProduct.image && (
            <div>
              <img src={newProduct.image} alt="Previsualización" style={{ width: '100px', height: '100px' }} />
            </div>
          )}
          <Button variant="secondary" onClick={handleSaveProduct}>
            {isEditing ? 'Guardar Cambios' : 'Agregar Producto'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;
