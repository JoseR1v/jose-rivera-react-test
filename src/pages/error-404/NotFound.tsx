import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './NotFound.module.scss'

const NotFound: React.FC = () => {
  return (
    <div className={styles.container404}>
        <FontAwesomeIcon className={styles.icon} icon={faTriangleExclamation} />
        <h1>404 - Página no encontrada</h1>
    </div>
  );
};

export default NotFound;
