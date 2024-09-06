import Button from '../../../atoms/button/Button';
import Input from '../../../atoms/input/Input';
import styles from '../User.module.scss';
import { useEffect, useState } from 'react';
import CryptoJS from 'crypto-js'; 
import { updateUser } from '../../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';

const secretKey = 'mi_clave_secreta'; 


const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};


const encryptData = (data: object) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

const UserInfo: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        const decryptedUserData = decryptData(storedUserData);
        setName(decryptedUserData.name);
        setEmail(decryptedUserData.email);
        
      } catch (error) {
        console.error('Error al desencriptar los datos del usuario', error);
      }
    }
  }, []);

  
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

  
  const handleSave = () => {
    
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    
    const encryptedUserData = encryptData({ name, email, password });

    
    localStorage.setItem('userData', encryptedUserData);

    
    dispatch(updateUser({ name, email, password }));

    alert('Datos guardados correctamente');
  };

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.userInfoInputContainer}>
        <Input
          label="Nombre"
          type="text"
          placeholder="Ingresa tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          placeholder="Ingresa tu nueva contraseña"
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
        <Input
          label="Confirmación de contraseña"
          type="password"
          placeholder="Confirma tu nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <Button onClick={handleSave}>Guardar</Button>
    </div>
  );
};

export default UserInfo;
