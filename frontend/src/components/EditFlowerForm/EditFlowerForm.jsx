import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './EditFlowerForm.css';
import HeaderLogin from '../Header/HeaderLogin.jsx';
import UserPlantCard from '../UserPlantCard/UserPlantCard.jsx';
import Calendar1 from '../Calendar/Calendar.jsx';
import { users } from '../../utils/constants.js';
import Footer from '../Footer/Footer.jsx';
import Modal from "../Modal/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { deleteFlower } from '../../services/actions/plants';
import { getMyFlowers, addNewFlower, editFlower } from '../../services/actions/plants';
import { removeCurrentFlower } from '../../services/actions/currentFlower';

function EditFlowerForm (props) {
  const { handleEditFlower } = props;
  const { currentFlower, editFlowerModalIsOpen } = useSelector(state => state.currentFlowerReducer);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plants } = useSelector(state => state.plantsReducer);
  //const flowerNames = plants.map((item) => ({name: item.name, id: item.id}));
  //const { user } = useSelector(state => state.authReducer);
  const [form, setValue] = useState({ flower_type: 0, name: '', notification: true });
  const nameInput = document.getElementById('editFlowerNameProfile');
  const typenput = document.getElementById('editFlowerTypeProfile');

  useEffect(()=> {
    if (editFlowerModalIsOpen && currentFlower) {
      console.log(1);
      console.log(currentFlower);
    setValue({ ...form, flower_type: currentFlower.flower_type, name: currentFlower.name, });}
  }, [editFlowerModalIsOpen])

  const onNameChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onTypeChange = e => {
    setValue({ ...form, [e.target.name]: plants.find((item) => (item.name === e.target.value)).id });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(currentFlower.id, form);
    handleEditFlower(currentFlower.id, form)
  //const data = {flowerName, flowerType};
  //onUpdateUser(data);
  }

  function findFlowerType() {
    if (currentFlower !== {} && plants.find((item) => (item.id === currentFlower.flower_type)) !== undefined)
    return plants.find((item) => (item.id === currentFlower.flower_type)).name || ''
  }

  function deleteFlower1() {
    dispatch(deleteFlower(currentFlower.id));
    dispatch(getMyFlowers());
    dispatch(removeCurrentFlower());
  }

  /*useEffect(()=> {
    console.log(form);
  }, [form])

  useEffect(()=> {
    console.log(currentFlower);
  }, [form])*/

return(
  <>
    <p className="profile__title">
      Изменить данные цветка
    </p>
    {plants !== undefined && currentFlower !== null && currentFlower !== '' &&
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
        <p>Хотите изменить вид своего цветка? Выберите новый</p>
      <select 
        name="flower_type"
        id="editFlowerTypeProfile"
        defaultValue={findFlowerType()}
        onChange={onTypeChange}
        >
      {((plants !== [] )  
        && plants.map((item, i) => (
          <>
            <option key={i} value={item.name}>{item.name}</option>
          </>
        )))}
      </select>
      <button className="editFlowerForm__button" type="submit">Сохранить изменения</button>
      <button className="editFlowerForm__button" type="button" onClick={deleteFlower1}>Удалить цветок</button>
    </form>}

  </>
)
}

export default EditFlowerForm;
