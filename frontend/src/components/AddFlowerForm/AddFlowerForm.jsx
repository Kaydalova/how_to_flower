import React, { useState, useEffect, useRef } from "react";
import './AddFlowerForm.css';
import { useSelector } from 'react-redux';

function AddFlowerForm (props) {
  const { handleAddFlower, handleEditUserTlg, addFlowerModalIsOpen } = props;
  const { plants } = useSelector(state => state.plantsReducer);
  const { userDataRequestRes } = useSelector(state => state.authReducer);
  const [form, setValue] = useState({ flower_type: 1, name: '', notification: true });
  const [formForTlg, setFormForTlg] = useState({ email: '', username: '', first_name: '', chat_id: '' });
  const [tlg, setTlg] = useState(false);
  const [notificationText, setNotificationText] = useState('Давайте!');
  const nameInput = document.getElementById('addFlowerNameProfile');
  const typeInput = document.getElementById('addFlowerTypeProfile');
  const addNotificationInputRef = useRef(null);

  const onNameChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onTypeChange = e => {
    setValue({ ...form, [e.target.name]: plants.find((item) => (item.name === e.target.value)).id });
  };

  const onNotificationChange = e => {
    setValue({ ...form, notification: !form.notification });
    addNotificationInputRef.current.checked = !addNotificationInputRef.current.checked;
  };

  const onNotificationClick = e => {
    changeNotificationText();
    addNotificationInputRef.current.checked = !addNotificationInputRef.current.checked;
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
    handleEditUserTlg(formForTlg);
    setTlg(true);
  }

  function changeNotificationText() {
    if (form && notificationText === 'Никогда!') {console.log('давайте'); setNotificationText('Давайте!');}
    if (form && notificationText === 'Давайте!') {console.log('никогда!'); setNotificationText('Никогда!');};
  }

  useEffect(()=> {
    setFormForTlg({ 
      email: userDataRequestRes.email,
      username: userDataRequestRes.username,
      first_name: userDataRequestRes.first_name,
      chat_id: '' 
    });
    setTlg(false);
  }, [])

  useEffect(()=> {
    setNotificationText('Давайте!');
    addNotificationInputRef.current.checked = true;
    setFormForTlg({ 
      email: userDataRequestRes.email,
      username: userDataRequestRes.username,
      first_name: userDataRequestRes.first_name,
      chat_id: userDataRequestRes.chat_id 
    });
    setTlg(false);
  }, [addFlowerModalIsOpen])

  return(
    <>
      <p className="profile__title">
        Новый цветок
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
          className="addFlowerForm__select"
        >
        {((plants !== [] )  
          && plants.map((item, i) => (
            <>
              <option key={i} value={item.name}>
                {item.name}
              </option>
            </>
          )))}
        </select>
        <p>Напоминать о времени поливки в Телеграм?</p>
        <div className="editFlowerForm__buttonBlock">
          <input 
            type="checkbox" 
            name="notification" 
            id="notificationAddForm" 
            ref={addNotificationInputRef}
            defaultChecked={true}
            onChange={onNotificationChange} 
            onClick={onNotificationClick}/> 
          <label htmlFor="notification">
            {notificationText}
          </label>
        </div>
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
              <button 
                type="submit" 
                onClick={handleTlgSubmit}
                className="addFlowerForm__button">Вот он</button>
            </form> 
          </>
        )}
        {(userDataRequestRes.chat_id !== '' && form.notification && tlg) && (
          <>
            <p>
              Спасибо! Теперь зайдите в <span className="addFlowerForm__botLink" onClick={handleLinkClick}>наш бот </span>и скажите ему что-нибудь, чтобы он мог отправлять Вам сообщения
            </p>
          </>
        )}
        <button className="addFlowerForm__button" type="submit">Добавить</button>
      </form> 
    </>
  )
}

export default AddFlowerForm;

