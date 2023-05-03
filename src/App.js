/** @format */

import './scss/app.scss';
import { Header } from './Components/Header';
import { Main } from './Components/pages/Main';
import { Cart } from './Components/pages/Cart';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react'
 
function App() {

  const [searchValue, setSearchValue] = useState('')

  return (
    <div className='wrapper'>
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className='content'>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='cart' element={<Cart/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
