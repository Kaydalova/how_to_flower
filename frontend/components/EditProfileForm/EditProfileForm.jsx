import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './EditProfileForm.css';
import HeaderLogin from '../../components/Header/HeaderLogin.jsx';
import UserPlantCard from '../../components/UserPlantCard/UserPlantCard.jsx';
import Calendar1 from '../../components/Calendar/Calendar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Modal from "../../components/Modal/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { updateUserData, getUserData } from '../../services/actions/auth';

function EditProfileForm ({handleEditUserData, editUserModalIsOpen}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userDataRequestRes } = useSelector(state => state.authReducer);
  const [form, setValue] = useState({ email: '', username: '',  first_name: '', chat_id: '',   });
  const userNameInput = document.getElementById('userNameEditProfile');
  const firstNameInput = document.getElementById('firstNameEditProfile');
  const emailInput = document.getElementById('emailEditProfile');
  const tlgInput = document.getElementById('tlgEditProfile');
  const submitButton1 = document.getElementById('buttonSubmitEditProfile');
  const userNameErrorSpan = document.getElementById('userNameSpanEditProfile');
  const firstNameErrorSpan = document.getElementById('firstNameSpanEditProfile');
  const emailErrorSpan = document.getElementById('emailSpanEditProfile');
  const tlgErrorSpan = document.getElementById('tlgSpanEditProfile');

  function validate() {
    if(emailInput && userNameInput && firstNameInput && tlgInput && !(emailInput.validationMessage || firstNameInput.validationMessage || userNameInput.validationMessage || tlgInput.validationMessage)) 
    return (submitButton1.classList.remove('editProfileForm__button-disabled'), submitButton1.classList.add('editProfileForm__button-active', 'button_type_primary'), submitButton1.disabled = false); 
    else if (emailInput && userNameInput && firstNameInput && tlgInput) return (submitButton1.classList.remove('editProfileForm__button-active', 'button_type_primary'), submitButton1.classList.add('editProfileForm__button-disabled'), submitButton1.disabled = true)
  }

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
    validate()
  };

  useEffect(()=> {
    //dispatch(getUserData());
    if (editUserModalIsOpen) {
      console.log(1);
    setValue({ ...form, email: userDataRequestRes.email, username: userDataRequestRes.username, first_name: userDataRequestRes.first_name, chat_id: userDataRequestRes.chat_id });}
    if (editUserModalIsOpen && submitButton1 !== null) {
      submitButton1.classList.remove('editProfileForm__button-active', 'button_type_primary');
      submitButton1.classList.add('editProfileForm__button-disabled');
      submitButton1.disabled = true;};
  }, [editUserModalIsOpen])

  useEffect(()=> {
    if (!editUserModalIsOpen )
    setValue({ ...form, email: '', username: '', first_name: '', chat_id: '' });
    /*if (submitButton1) {
    submitButton1.classList.remove('login__button-active');
    submitButton1.classList.add('login__button-disabled');};*/
    if (!editUserModalIsOpen && userNameErrorSpan && userNameErrorSpan.textContent !== null)
    userNameErrorSpan.textContent = '';
    if (!editUserModalIsOpen && tlgErrorSpan && tlgErrorSpan.textContent !== null)
    tlgErrorSpan.textContent = '';
    if (!editUserModalIsOpen && emailErrorSpan && emailErrorSpan.textContent !== null)
    emailErrorSpan.textContent = '';
    if (!editUserModalIsOpen && firstNameErrorSpan && firstNameErrorSpan.textContent !== null)
    firstNameErrorSpan.textContent = '';
  }, [editUserModalIsOpen])

  function handleSubmit(e) {
    e.preventDefault();
    handleEditUserData(form);
  }

  return(
    <div className="profile">
      <p className="profile__title">
        Редактировать профиль
      </p>
      <form 
        onSubmit={handleSubmit} 
        className="editProfileForm__container">
        <input 
          required 
          name="username"
          id='userNameEditProfile'
          minLength='2' 
          maxLength='40' 
          placeholder={userDataRequestRes.username}
          type="text" 
          value={form.username}
          onChange={e => {
            onChange(e);
            if (userNameInput) 
            return (userNameErrorSpan.textContent = userNameInput.validationMessage);}}
          className="profile__text profile__row-container" 
          pattern="[a-zA-ZA-Zа-яЁё\-\s]{2,30}"/>
        <span 
          className="login__text input-userNameEditProfile-error login__input-error" 
          id='userNameSpanEditProfile'> 
        </span>
        <input 
          required 
          name="email" 
          id='emailEditProfile'
          placeholder={userDataRequestRes.email}
          type="email" 
          value={form.email}
          onChange={e => {
            onChange(e);
            if (emailInput) 
            return (emailErrorSpan.textContent = emailInput.validationMessage)}} 
          className="profile__text profile__row-container"/>
        <span 
          className="login__text input-emailEditProfile-error login__input-error" 
          id='emailSpanEditProfile'> 
        </span>
        <input 
          required  
          name="first_name" 
          id='firstNameEditProfile'
          type="text" 
          placeholder={userDataRequestRes.first_name}
          value={form.first_name}
          onChange={e => {
            onChange(e);
            if (firstNameInput) 
            return (firstNameErrorSpan.textContent = firstNameInput.validationMessage);}} 
          className="profile__text profile__row-container"/>
        <span 
          className="login__text input-firstNameEditProfile-error login__input-error" 
          id='firstNameSpanEditProfile'> 
        </span>
        <input 
          name="chat_id" 
          id='tlgEditProfile'
          placeholder="Telegram" 
          type="text" 
          value={form.chat_id}
          onChange={e => {
            onChange(e);
            if (tlgInput) 
            return (tlgErrorSpan.textContent = tlgInput.validationMessage);}} 
          className="profile__text profile__row-container"/>
        <span 
          className="login__text input-tlgEditProfile-error login__input-error" 
          id='tlgSpanEditProfile'> 
        </span>
        <button type="submit" className="editProfileForm__button editProfileForm__button-disabled" id='buttonSubmitEditProfile'>Сохранить изменения</button>
      </form> 
    </div>
  )
}

export default EditProfileForm;

/*
//если однажды захотим добавить пароль
//placeholder={userDataRequestRes.username}
//placeholder={userDataRequestRes.first_name}
        <input 
          required  
          name="password" 
          placeholder="Пароль" 
          type="text" 
          value={form.password}
          onChange={onChange} 
          className="profile__text profile__row-container"/>
*/