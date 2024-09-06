import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Products from './pages/products/Products';
import NotFound from './pages/error-404/NotFound';
import User from './pages/user/User';
import ProductDetails from './pages/products/ProductDetails';
import CryptoJS from 'crypto-js'; 

const secretKey = 'mi_clave_secreta';

const decryptData = (encryptedData: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

function App() {
  const isAuthenticated = () => {
    const userData = localStorage.getItem('userData');

    if (userData) {
      try {
        const decryptedUserData = decryptData(userData);
        return decryptedUserData && decryptedUserData.name;
      } catch (error) {
        console.error('Error al desencriptar userData', error);
        return false;
      }
    }

    return false;
  };

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated() ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/products" element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        } />
        <Route path="/products/:id" element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } />
        <Route path="/users" element={
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
