/** @format */

import React, { useState, useEffect } from 'react';

import { Sort } from '../Sort';
import { Categories } from '../Categories';
import { PizzaItem } from '../PizzaItem';
import { Sceleton } from '../PizzaItem/Skeleton';

export const Main = () => {
  const [items, setItems] = useState([]);
  const [isLoding, setIsLodaing] = useState(true);

  useEffect(() => {
    fetch('https://64497c2fb88a78a8f0092e91.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((arr) => {
        setItems(arr);
        setIsLodaing(false);
      });
  }, []);
  return (
    <div className='container'>
      <div className='content__top'>
        <Categories />
        <Sort />
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
