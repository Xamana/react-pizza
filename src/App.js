/** @format */

import './scss/app.scss';
import { Header } from './Components/Header';
import { Sort } from './Components/Sort';
import { Categories } from './Components/Categories';
import { PizzaItem } from './Components/PizzaItem';
import { useState, useEffect } from 'react';
import { Sceleton } from './Components/PizzaItem/Skeleton';

function App() {
  const [items, setItems] = useState([]);
  const [isLoding, setIsLodaing] = useState(true);

  useEffect(() => {
    fetch('https://64497c2fb88a78a8f0092e91.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr)
        setIsLodaing(false)
      });
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {
              isLoding 
                ? [...new Array(6)].map((_, i) => <Sceleton key={i}/>)
                : items.map((obj) => (<PizzaItem {...obj} />))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
