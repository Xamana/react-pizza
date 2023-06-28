/** @format */

import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate()

  React.useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`https://64497c2fb88a78a8f0092e91.mockapi.io/items/${id}`);
        setPizza(data);
        console.log(data);
      } catch (error) {
        alert('Ошибка получения питсов');
        navigate('/')
      }
    };
    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <h2>Загрузка...</h2>
    );
  }

  return (
    <div className='container'>
      <h2>{pizza.title}</h2>
      <img src={pizza.imageUrl} alt='' />
      <div>{pizza.price} ₽</div>
    </div>
  );
};
