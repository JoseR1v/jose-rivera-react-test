import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import styles from './Login.module.scss';
import Card from '../../atoms/card/Card';
import Input from '../../atoms/input/Input';
import Button from '../../atoms/button/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import useFetchProducts from '../../hooks/useFetchProducts';

const secretKey = 'mi_clave_secreta'; 


const encryptData = (data: object) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString(); 
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [errorPassword, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loading, error } = useFetchProducts();
  const navigate = useNavigate();

  
  const validatePassword = (value: string) => {
    const errors: string[] = [];

    if (value.length < 6) {
      errors.push('Debe tener al menos 6 caracteres');
    }

    if (value.length > 12) {
      errors.push('Debe tener un máximo de 12 caracteres');
    }

    if (!/[A-Z]/.test(value)) {
      errors.push('Debe contener al menos una letra mayúscula');
    }

    if (!/[a-z]/.test(value)) {
      errors.push('Debe contener al menos una letra minúscula');
    }

    if (!/[0-9]/.test(value)) {
      errors.push('Debe contener al menos un número');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.push('Debe contener al menos un carácter especial');
    }

    setPasswordErrors(errors); 
  };

  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    validatePassword(value); 
  };

  const user = useSelector((state: RootState) => state.user);

  const handleLogin = () => {
    
    if (email === user.email && password === user.password) {
      const userData = {
        name: user.name,
        email: user.email,
        sessionToken: '23021 | Token', 
      };

      
      const encryptedUserData = encryptData(userData);
      localStorage.setItem('userData', encryptedUserData);
      
      setIsLoggedIn(true)
    } else {
      
      setError('Correo o contraseña incorrectos');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/products');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.cardContent}>
          <div className={styles.textContainer}>
            <h2>Login</h2>
            <p>José Rivera React Test</p>
          </div>
          <div className={styles.formContainer}>
            <div className={styles.errorContainer}>
              {errorPassword && <p className={styles.error}>{errorPassword}</p>}
              <div className={styles.inputsContainer}>
                <Input
                  label="Correo"
                  type="text"
                  placeholder="Ingresa tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                  <Input
                    label="Contraseña"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {passwordErrors.length > 0 && (
                    <div className={styles.passwordErrors}>
                      <ul>
                        {passwordErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <Input
                  label="Confirmación de contraseña"
                  type="password"
                  placeholder="Confirma tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleLogin}>Ingresar</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;
