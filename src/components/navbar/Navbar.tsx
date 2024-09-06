import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import styles from './Navbar.module.scss';

const secretKey = 'mi_clave_secreta';

const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  let userName = 'Usuario';

  const storedUserData = localStorage.getItem('userData');

  if (storedUserData) {
    try {
      const decryptedUserData = decryptData(storedUserData);
      userName = decryptedUserData.name;
      
    } catch (error) {
      console.error('Error al desencriptar los datos del usuario', error);
    }
  }

  const handleUserClick = () => {
    const storedEncryptedToken = localStorage.getItem('userData');
    const validToken = '23021 | Token';

    if (storedEncryptedToken) {
      const decryptedToken = decryptData(storedEncryptedToken);
      const token = decryptedToken.sessionToken
      

      if (token === validToken) {
        navigate('/users'); 
      } else {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={styles.container}>
      <h1>José Rivera React Test</h1>
      <button onClick={handleUserClick} className={styles.userContainer}>
        <FontAwesomeIcon icon={faUser} />
        <h3>{userName}</h3>
      </button>
    </div>
  );
};

export default Navbar;
