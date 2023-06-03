import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './AddFlowerForm.css';
import HeaderLogin from '../Header/HeaderLogin.jsx';
import UserPlantCard from '../UserPlantCard/UserPlantCard.jsx';
import Calendar1 from '../Calendar/Calendar.jsx';
import { users } from '../../utils/constants.js';
import Footer from '../Footer/Footer.jsx';
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from 'react-redux';

function AddFlowerForm ({handleAddFlower}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plants } = useSelector(state => state.plantsReducer);
  //const flowerNames = plants.map((item) => ({name: item.name, id: item.id}));
  //const { user } = useSelector(state => state.authReducer);
  const [form, setValue] = useState({ flower_type: 1, name: '', notification: true });
  const nameInput = document.getElementById('addFlowerNameProfile');
  const typenput = document.getElementById('addFlowerTypeProfile');

  const onNameChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onTypeChange = e => {
    
    setValue({ ...form, [e.target.name]: plants.find((item) => (item.name === e.target.value)).id });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleAddFlower(form)
  //const data = {flowerName, flowerType};
  //onUpdateUser(data);
  }

/*useEffect(()=> {
  console.log(form);
}, [form])*/

return(
  <>
    <p className="profile__title">
      Изменить данные цветка
    </p>
    <form 
      onSubmit={handleSubmit} 
      id="profile__form" 
      className="profile__container">
      <input 
        required 
        id="addFlowerNameProfile" 
        name="name" 
        minLength='2' 
        maxLength='40' 
        placeholder="Имя цветка"
        type="text" 
        value={form.name}
        onChange={onNameChange} 
        className="profile__text profile__row-container" 
        pattern="[a-zA-ZA-Zа-яА-ЯЁё1234567890\-\s]{2,30}"/>
        <p>Ну, кто тут у нас? Выберите вид</p>
      <select 
        name="flower_type"
        id="addFlowerTypeProfile"
        defaultValue='Аглаонема кокомелон'
        onChange={onTypeChange}
        >
      {((plants !== [] )  
        && plants.map((item, i) => (
          <>
          <option key={i} value={item.name}>{item.name}</option>
          </>
        )))}
      </select>
      <button type="submit">Добавить</button>
    </form> 
  </>
)
}

export default AddFlowerForm;

/*
      <input required checked type="radio" name="notification" id="rb2" onChange={setValue({ ...form, notification: false })}/> <label for="rb2">Получать напоминания о поливе в Телеграмм</label>

      */
