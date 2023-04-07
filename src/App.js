import { Route, Routes } from 'react-router-dom';
import Store from './pages/Store';
import Success from './pages/Success';
import Cancel from './pages/Cancel'
import CartProvider from './Contexts/CartContext';

function App() {
  return (
    <>
    <CartProvider>
    <Routes>
      <Route path='/' element={<Store />} />
      <Route path='/success' element={<Success />}/>
      <Route path='/cancel' element={<Cancel />} />
    </Routes>
    </CartProvider>
    </>
  );
}

export default App;
