/** @format */

import React, { useEffect } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { Sort } from '../Sort';
import { Categories } from '../Categories';
import { PizzaItem } from '../PizzaItem';
import { Sceleton } from '../PizzaItem/Skeleton';
import { sortList } from '../Sort';
import { fetchPizzas, selectPizzaData } from '../../redux/slices/pizzaSlice';

import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory, setFilters, selectFilter } from '../../redux/slices/filterSlice';

export const Main: React.FC = () => {
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
      // @ts-ignore
      fetchPizzas({
        catgory,
        sortBy,
        order,
        search,
      }),
    );
    window.scrollTo(0, 0);
  };

  const onChangeCategory= (activeCategoryIndex: number) => {
    dispatch(setActiveCategory(activeCategoryIndex))
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sort === params.sortProperty);

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

  const skeleton = [...new Array(6)].map((_, i) => <Sceleton key={i} />)

  const  pizzas = items.map((obj: any, i: number) => (
      <PizzaItem  {...obj} key={i}/>
  ))

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          activeCategory={activeCategory}
          onChangeCategory={onChangeCategory}
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
          skeleton
        ) : (
          pizzas
        )}
      </div>
    </div>
  );
};
