/** @format */ 
const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

export const Categories = (props) => {
  const {activeCategory, onChangeCategory} = props;
  return (
    <div className='categories'>
      <ul>
        {categories.map((item, i) => (<li key={i} className={activeCategory === i ? 'active' : ''} onClick={() => onChangeCategory(i)}>{item}</li>))}
      </ul>
    </div>
  );
};
