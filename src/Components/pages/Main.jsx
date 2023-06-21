/** @format */

import React, { useState, useEffect, useContext } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Sort } from '../Sort';
import { Categories } from '../Categories';
import { PizzaItem } from '../PizzaItem';
import { Sceleton } from '../PizzaItem/Skeleton';
import { list } from '../Sort';
import { fetchPizzas, selectPizzaData } from '../../redux/slices/pizzaSlice';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory, setFilters, selectFilter } from '../../redux/slices/filterSlice';

export const Main = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, items } = useSelector(selectPizzaData);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { activeSortElement, activeCategory, searchValue } = useSelector(selectFilter);
  const getPizzas = async () => {
    const catgory = activeCategory > 0 ? `category=${activeCategory}` : '';
    const sortBy = activeSortElement.sort.replace('-', '');
    const order = activeSortElement.sort.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        catgory,
        sortBy,
        order,
        search,
      }),
    );
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sort === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [activeCategory, activeSortElement, searchValue]);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: activeSortElement.sort,
        activeCategory,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [activeCategory, activeSortElement, searchValue]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={(activeCategoryIndex) =>
            dispatch(setActiveCategory(activeCategoryIndex))
          }
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === 'error' ? (
          <div className='content__error-info'>
            <h1>Произошла ошибка</h1>
            <p>Пиццы не загрузились</p>
          </div>
        ) : status === 'loading' ? (
          [...new Array(6)].map((_, i) => <Sceleton key={i} />)
        ) : (
          items.map((obj, i) => <PizzaItem key={i} {...obj} />)
        )}
      </div>
    </div>
  );
};
