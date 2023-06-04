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
import { updateUserData, getUserData } from '../../services/actions/auth';

function AddFlowerForm (props) {
  const { handleAddFlower, handleEditUserTlg } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plants } = useSelector(state => state.plantsReducer);
  const { userDataRequestRes } = useSelector(state => state.authReducer);
  const [form, setValue] = useState({ flower_type: 1, name: '', notification: true });
  const [formForTlg, setFormForTlg] = useState({ email: '', username: '', first_name: '', chat_id: '' });
  const [tlg, setTlg] = useState(false);
  const nameInput = document.getElementById('addFlowerNameProfile');
  const typeInput = document.getElementById('addFlowerTypeProfile');
  const notificationInput = document.getElementById('notificationAddForm');
  let botText = 'наш бот';
  const botLink = botText.link("https://t.me/how_to_flower_bot");

  const onNameChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onTypeChange = e => {
    setValue({ ...form, [e.target.name]: plants.find((item) => (item.name === e.target.value)).id });
  };

  const onNotificationChange = e => {
    setValue({ ...form, notification: !form.notification });
    notificationInput.checked = !notificationInput.checked;
  };

  const onNotificationClick = e => {
    notificationInput.checked = !notificationInput.checked;
  };

  const onTlgChange = e => {
    setFormForTlg({ ...formForTlg, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleAddFlower(form);
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

  function changeNotificationText() {
    if (form.notification) return 'Давайте';
    else return 'Никогда!'
  }

  useEffect(()=> {
    console.log(form);
  }, [form])

  useEffect(()=> {
    setFormForTlg({ email: userDataRequestRes.email, username: userDataRequestRes.username,  first_name: userDataRequestRes.first_name, chat_id: '' });
    setTlg(false);
  }, [])

  useEffect(()=> {
    if (notificationInput !== null && form.notification === true)
    {notificationInput.checked = true;}
  }, [notificationInput])

return(
  <>
    <p className="profile__title">
      Добавить новый цветок
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
      {((plants !== [] && plants !== null && plants !== undefined )  
        && plants.map((item, i) => (
          <>
          <option key={i} value={item.name}>{item.name}</option>
          </>
        )))}
      </select>
      <p>Напоминать о времени поливки в Телеграм?</p>
      <input type="checkbox"  name="notification" id="notificationAddForm" onChange={onNotificationChange} onClick={onNotificationClick}/> 
      <label htmlFor="notification">{changeNotificationText()}</label>
      {(userDataRequestRes.chat_id === '' && form.notification) && (
        <>
        <p>Нам нужен Ваш ник в Телеграм, чтобы отправлять напоминания о поливке. Укажите его, пожалуйста</p>
        <form 
          onSubmit={handleTlgSubmit} 
          id="addFlowerForm__addTlg" 
          className="profile__container">
        <input 
          id="addFlowerTlg" 
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
      <button type="submit">Добавить</button>
    </form> 
  </>
)
}

export default AddFlowerForm;
