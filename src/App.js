/** @format */

import './scss/app.scss';
import { Header } from './Components/Header';
import { Main } from './Components/pages/Main';
import { Cart } from './Components/pages/Cart';
import { Route, Routes } from 'react-router-dom';
import { FullPizza } from './Components/FullPizza';
import { MainLayout } from './layouts/MainLayout';


 
function App() {


  return (
          <Routes>
             <Route path='/' element={<MainLayout/>}>
              <Route path='' element={<Main />}/>
              <Route path='cart' element={<Cart/>}/>
              <Route path='pizza/:id' element={<FullPizza/>}/>
             </Route>
            
          </Routes>
  );
}

export default App;
