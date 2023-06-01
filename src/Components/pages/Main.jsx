/** @format */

import React, { useState, useEffect, useContext } from 'react';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';

import { Sort } from '../Sort';
import { Categories } from '../Categories';
import { PizzaItem } from '../PizzaItem';
import { Sceleton } from '../PizzaItem/Skeleton';
import { list } from '../Sort';

import { SearchContext } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveCategory, setFilters } from '../../redux/slices/filterSlice';
import axios from 'axios';

export const Main = (props) => {
  const {searchValue} = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoding, setIsLodaing] = useState(true);
  
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activeSortElement, activeCategory  }= useSelector(state => state.filter)

  const fetchPazzas = ( ) => {
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
  }

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find(obj => obj.sort === params.sortProperty)

      dispatch(setFilters({...params, sort}));
      isSearch.current = true;
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current){
      fetchPazzas()
    }
    isSearch.current = false;
  }, [activeCategory, activeSortElement, searchValue]);

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if(isMounted.current){
      const queryString = qs.stringify({
        sortProperty: activeSortElement.sort,
        activeCategory,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
    
  }, [activeCategory, activeSortElement, searchValue])



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
