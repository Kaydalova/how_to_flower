import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import './UserPlantCard.css';
import plant1 from '../../images/plant1.png';
import find from '../../images/find.svg';
import exit from '../../images/exit-menu.svg';
import add from '../../images/add-button.svg';
import del from '../../images/button-del.svg';
import pensil from '../../images/pensil.png';
import { setCurrentFlower } from '../../services/actions/currentFlower';

function UserPlantCard(props) {
  const dispatch = useDispatch();
  const { plant } = props;
  const { plants, myFlowers } = useSelector(state => state.plantsReducer);

  const handleClick = e => {
    console.log('dd');
    console.log(plant);
    dispatch(setCurrentFlower(plant));
  }

  return (
    <li className="userPlantCard__card" >
      {plant && plant.name !== undefined && <>
      <img src={plant.image} alt="Изображение цветка" className="userPlantCard__image"/>
      <div className="userPlantCard__text-container">
        <h3 className="userPlantCard__title">Имя: {plant.name}</h3>
        <p className="userPlantCard__subtitle">Вид: {plants.find((item) => (item.id === plant.flower_type)).name}</p>
        <p className="userPlantCard__subtitle">Режим полива: надо придумать</p>
        <img src={pensil} alt="кнопка редактирования" className="userPlantCard__icon" onClick={handleClick}/>
      </div>
      </>}
    </li>
  )
}

export default UserPlantCard;
