/** @format */

import './scss/app.scss';
import { Header } from './Components/Header';
import { Sort } from './Components/Sort';
import { Categories } from './Components/Categories';
import { PizzaItem } from './Components/PizzaItem';
import pizzas from './assets/pizzas.json'

function App() {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort/>
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
          {pizzas.map((obj) => <PizzaItem {...obj}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
