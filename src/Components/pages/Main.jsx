/** @format */

import React, { useState, useEffect, useContext } from 'react';

import { Sort } from '../Sort';
import { Categories } from '../Categories';
import { PizzaItem } from '../PizzaItem';
import { Sceleton } from '../PizzaItem/Skeleton';
import { SearchContext } from '../../App';

export const Main = (props) => {
  const {searchValue} = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoding, setIsLodaing] = useState(true);
  const [activeSortElement, setActiveSortElement] = useState({name: 'популярности', sort: 'rating'});
  const [activeCategory, setActiveCategory] = useState(0);

  

  useEffect(() => {
    setIsLodaing(true);

    const catgory = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy = activeSortElement.sort.replace('-', '');
    const order = activeSortElement.sort.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    
    fetch(`https://64497c2fb88a78a8f0092e91.mockapi.io/items?${catgory}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLodaing(false);
      });
  }, [activeCategory, activeSortElement, searchValue]);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories activeCategory={activeCategory} onChangeCategory={(i) => setActiveCategory(i)}/>
        <Sort activeSortElement={activeSortElement} changeSortElement={(obj) => setActiveSortElement(obj)}/>
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
            {isLoding
            ? [...new Array(6)].map((_, i) => <Sceleton key={i} />)
            : items.map((obj) => <PizzaItem {...obj} />)}
      </div>
    </div>
  );
};
