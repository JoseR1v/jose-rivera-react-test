import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js'; // Importar la librería para desencriptar el token
import styles from './Navbar.module.scss';

type NavbarProps = {
    onClick?: () => void;
    name: string;
};

const Navbar: React.FC<NavbarProps> = ({ onClick, name }) => {
  const navigate = useNavigate();
  const secretKey = 'mi_clave_secreta';

  const decryptToken = (encryptedToken: string) => {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const handleUserClick = () => {
    const storedEncryptedToken = localStorage.getItem('authToken');
    const validToken = '23021 | Token';

    if (storedEncryptedToken) {
      const decryptedToken = decryptToken(storedEncryptedToken);

      if (decryptedToken === validToken) {
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
        <h3>{name}</h3>
      </button>
    </div>
  );
};

export default Navbar;
