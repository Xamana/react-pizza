/** @format */

import './scss/app.scss';
import { Header } from './Components/Header';
import { Main } from './Components/pages/Main';
import { Cart } from './Components/pages/Cart';
import { Route, Routes } from 'react-router-dom';


 
function App() {


  return (
    <div className='wrapper'>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='cart' element={<Cart/>}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
