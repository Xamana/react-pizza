/** @format */

import './scss/app.scss';
import { Header } from './Components/Header';
import { Main } from './Components/pages/Main';
import { Cart } from './Components/pages/Cart';
import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react'

export const SearchContext = createContext();
 
function App() {
  

  const [searchValue, setSearchValue] = useState('')
  console.log(searchValue)

  return (
    <div className='wrapper'>
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
        <Header />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Main />}/>
            <Route path='cart' element={<Cart/>}/>
          </Routes>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
