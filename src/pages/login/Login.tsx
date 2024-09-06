import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { useDispatch } from 'react-redux';
import { setProducts } from '../../redux/slices/productSlice'; // Importa la acción para setProducts
import styles from './Login.module.scss';
import Card from '../../atoms/card/Card';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const secretKey = 'mi_clave_secreta'; // Cambia esto por una clave secreta que mantengas segura.

  const encryptToken = (token: string) => {
    return CryptoJS.AES.encrypt(token, secretKey).toString();
  };

  const fetchProductsAndSetState = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Error fetching products');
      }
      const products = await response.json();
      dispatch(setProducts(products)); // Despacha la acción para guardar los productos en Redux
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogin = async () => {
    if (email === 'user@example.com' && password === 'Password123@') {
      const token = '23021 | Token';
      const encryptedToken = encryptToken(token);

      localStorage.setItem('authToken', encryptedToken);

      await fetchProductsAndSetState(); 

      navigate('/products'); 
    } else {
      setError('Datos incorrectos, vuelve a intentarlo');
    }
  };

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.cardContent}>
          <div className={styles.textContainer}>
            <h2>Login</h2>
            <p>Jose Rivera React Test</p>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.errorContainer}>
              <div className={styles.inputsContainer}>
                <Input
                  label="Correo"
                  type="text"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  label="Contraseña"
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  label="Confirmación de contraseña"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              {error && <p className={styles.error}>{error}</p>}
            </div>
            <Button onClick={handleLogin}>Ingresar</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
