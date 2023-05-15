/** @format */

import React, { useState, useEffect, useContext } from 'react';

import { Sort } from '../Sort';
import { Categories } from '../Categories';
import { PizzaItem } from '../PizzaItem';
import { Sceleton } from '../PizzaItem/Skeleton';
import { SearchContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory } from '../../redux/slices/filterSlice';
import axios from 'axios';

export const Main = (props) => {
  const {searchValue} = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoding, setIsLodaing] = useState(true);

  const dispatch = useDispatch();
  const { activeSortElement, activeCategory  }= useSelector(state => state.filter)

  useEffect(() => {
    setIsLodaing(true);

    const catgory = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy = activeSortElement.sort.replace('-', '');
    const order = activeSortElement.sort.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';
    
    fetch(``)
      .then((res) => {
        return res.json();
      })
      ;

      axios.get(`https://64497c2fb88a78a8f0092e91.mockapi.io/items?${catgory}&sortBy=${sortBy}&order=${order}${search}`)
      .then((res) => {
        setItems(res.data);
        setIsLodaing(false);
      })

  }, [activeCategory, activeSortElement, searchValue]);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories activeCategory={activeCategory} onChangeCategory={(activeCategoryIndex) => dispatch(setActiveCategory(activeCategoryIndex))}/>
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
            {isLoding
            ? [...new Array(6)].map((_, i) => <Sceleton key={i} />)
            : items.map((obj, i) => <PizzaItem key={i} {...obj} />)}
      </div>
    </div>
  );
};
