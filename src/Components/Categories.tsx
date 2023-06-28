/** @format */ 
import React from 'react';

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  activeCategory: number;
   onChangeCategory: (i: number) => void;
}
export const Categories: React.FC<CategoriesProps> = (props) => {
  const {activeCategory, onChangeCategory} = props;
  return (
    <div className='categories'>
      <ul>
        {categories.map((item, i) => (<li key={i} className={activeCategory === i ? 'active' : ''} onClick={() => onChangeCategory(i)}>{item}</li>))}
      </ul>
    </div>
  );
};

 