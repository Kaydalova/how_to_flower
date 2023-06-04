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
  const { handleEditFlower, handleEditUserTlg } = props;
  const { currentFlower, editFlowerModalIsOpen } = useSelector(state => state.currentFlowerReducer);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plants } = useSelector(state => state.plantsReducer);
  //const flowerNames = plants.map((item) => ({name: item.name, id: item.id}));
  //const { user } = useSelector(state => state.authReducer);
  const [form, setValue] = useState({ flower_type: 0, name: '', notification: true });
  const [formForTlg, setFormForTlg] = useState({ email: '', username: '', first_name: '', chat_id: '' });
  const { userDataRequestRes } = useSelector(state => state.authReducer);
  const [tlg, setTlg] = useState(false);
  const nameInput = document.getElementById('editFlowerNameProfile');
  const typenput = document.getElementById('editFlowerTypeProfile');
  const notificationInput1 = document.getElementById('notificationEditForm');

  useEffect(()=> {
    if (editFlowerModalIsOpen && currentFlower) {
      console.log(1);
      console.log(currentFlower);
    setValue({ ...form, flower_type: currentFlower.flower_type, name: currentFlower.name, notification: currentFlower.notification });}
  }, [editFlowerModalIsOpen])

  const onNameChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onTypeChange = e => {
    setValue({ ...form, [e.target.name]: plants.find((item) => (item.name === e.target.value)).id });
  };

  const onNotificationChange = e => {
    setValue({ ...form, notification: !form.notification });
    notificationInput1.checked = !notificationInput1.checked;
  };

  const onNotificationClick = e => {
    notificationInput1.checked = !notificationInput1.checked;
  };

  const onTlgChange = e => {
    setFormForTlg({ ...formForTlg, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log(currentFlower.id, form);
    handleEditFlower(currentFlower.id, form)
  }

  function handleLinkClick() {
    window.open("https://t.me/how_to_flower_bot");
  }

  function handleTlgSubmit(e) {
    e.preventDefault();
    console.log(formForTlg);
    handleEditUserTlg(formForTlg);
    setTlg(true);
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

  function changeNotificationText() {
    if (form.notification) return 'Давайте';
    else return 'Никогда!'
  }

  useEffect(()=> {
    console.log(form);
  }, [form])

  useEffect(()=> {
    if (notificationInput1 !== null && form.notification === true)
    {notificationInput1.checked = true;}
  }, [notificationInput1])

  useEffect(()=> {
    setFormForTlg({ email: userDataRequestRes.email, username: userDataRequestRes.username,  first_name: userDataRequestRes.first_name, chat_id: '' });
    setTlg(false);
  }, [])

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
      <p>Напоминать о времени поливки в Телеграм?</p>
      <input type="checkbox" name="notification" id="notificationEditForm" onChange={onNotificationChange} onClick={onNotificationClick}/> 
      <label htmlFor="notification">{changeNotificationText()}</label>
      {(userDataRequestRes.chat_id === '' && form.notification) && (
        <>
        <p>Нам нужен Ваш ник в Телеграм, чтобы отправлять напоминания о поливке. Укажите его, пожалуйста</p>
        <form 
          onSubmit={handleTlgSubmit} 
          id="editFlowerForm__addTlg" 
          className="profile__container">
        <input 
          id="editFlowerTlg" 
          name="chat_id" 
          minLength='2' 
          maxLength='100' 
          placeholder="@print_your_magnificent_nickname_here"
          type="text" 
          value={formForTlg.chat_id}
          onChange={onTlgChange} 
          className="profile__text profile__row-container"/>
        <button type="submit" onClick={handleTlgSubmit}>Вот он</button>
        </form> 
      </>
      )}
      {(userDataRequestRes.chat_id !== '' && form.notification && tlg) && (
        <>
        <p>Спасибо! Теперь зайдите в <span className="addFlowerForm__botLink" onClick={handleLinkClick}>наш бот </span>и скажите ему что-нибудь, чтобы он мог отправлять Вам сообщения</p>
      </>
      )}
      <button type="submit">Сохранить изменения</button>
      <button type="button" onClick={deleteFlower1}>Удалить цветок</button>
    </form>}

  </>
)
}

export default EditFlowerForm;
