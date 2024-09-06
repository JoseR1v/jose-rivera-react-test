import Button from '../../../atoms/button/Button';
import Input from '../../../atoms/input/Input';
import styles from '../User.module.scss'
import { useState } from 'react';

const UserInfo: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className={styles.userInfoContainer}>
        <div className={styles.userInfoInputContainer}>
                <Input
                    label='Nombre'
                    type="text" 
                    placeholder="Ingresa tu nombre"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                />
                <Input 
                    label='Correo'
                    type="text" 
                    placeholder="Ingresa tu correo"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input 
                    label='Contraseña'
                    type="password" 
                    placeholder="Ingresa tu nueva contraseña"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Input 
                    label='Confirmación de contraseña'
                    type="password" 
                    placeholder="Confirma tu nueva contraseña"
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <Button>Guardar</Button>
    </div>
  );
};

export default UserInfo;
