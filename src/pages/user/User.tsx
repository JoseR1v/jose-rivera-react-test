import styles from '../user/User.module.scss';

import Menu from '../../components/menu/Menu';
import UserInfo from './content/UserInfo';
import ProductList from './content/ProductList';
import { useNavigate } from 'react-router-dom';

const User: React.FC = () => {

  const navigate = useNavigate();

  const tabs = [
    {
      name: 'Usuario',
      content: <UserInfo />,
    },
    {
      name: 'Productos',
      content: <ProductList/>,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.titleProducts}>
        <h2>Hola José Manuel</h2>
        <a className={styles.anchorProducts} onClick={() => navigate('/products')}>
          Volver a productos
        </a>
      </div>
      <Menu tabs={tabs} />
    </div>
  );
};

export default User;
