import React, { useState, useEffect, useRef } from "react";
import './EditFlowerForm.css';
import basket from '../../images/basket.png';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFlower } from '../../services/actions/plants';
import { getMyFlowers } from '../../services/actions/plants';
import { removeCurrentFlower } from '../../services/actions/currentFlower';

function EditFlowerForm (props) {
  const { handleEditFlower, handleEditUserTlg } = props;
  const { currentFlower, editFlowerModalIsOpen } = useSelector(state => state.currentFlowerReducer);
  const dispatch = useDispatch();
  const { plants } = useSelector(state => state.plantsReducer);
  const [editForm, setValue] = useState({ flower_type: 0, name: '', notification: true });
  const [editFormForTlg, setEditFormForTlg] = useState({ email: '', username: '', first_name: '', chat_id: '' });
  const [editNotificationText, setEditNotificationText] = useState('Давайте!');
  const nameInput = document.getElementById('editFlowerNameProfile');
  const typenput = document.getElementById('editFlowerTypeProfile');
  const [tlg, setTlg] = useState(false);
  const notificationEditInput = document.getElementById('notificationEditForm');
  const { userDataRequestRes } = useSelector(state => state.authReducer);
  const editNotificationInputRef = useRef(null);

  useEffect(()=> {
    if (editFlowerModalIsOpen && currentFlower && currentFlower.notification === true) {
      setValue({ ...editForm, flower_type: currentFlower.flower_type, name: currentFlower.name, notification: currentFlower.notification });
      setEditNotificationText('Давайте!');
      editNotificationInputRef.current.checked = currentFlower.notification;
    }
    else if (editFlowerModalIsOpen && currentFlower && currentFlower.notification === false) {
      setValue({ ...editForm, flower_type: currentFlower.flower_type, name: currentFlower.name, notification: false });
      setEditNotificationText('Никогда!');
      editNotificationInputRef.current.checked = currentFlower.notification;
    };
  }, [editFlowerModalIsOpen, notificationEditInput])

  const onNameChange = e => {
    setValue({ ...editForm, [e.target.name]: e.target.value });
  };

  const onTypeChange = e => {
    setValue({ ...editForm, [e.target.name]: plants.find((item) => (item.name === e.target.value)).id });
  };

  const onNotificationChange = e => {
    setValue({ ...editForm, notification: !editForm.notification });
    editNotificationInputRef.current.checked = !editNotificationInputRef.current.checked;
  };

  const onNotificationClick = e => {
    changeNotificationText();
    editNotificationInputRef.current.checked = !editNotificationInputRef.current.checked;
  };

  const onTlgChange = e => {
    setEditFormForTlg({ ...editFormForTlg, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleEditFlower(currentFlower.id, editForm)
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
    if (editForm && editNotificationText === 'Никогда!') {setEditNotificationText('Давайте!');}
    if (editForm && editNotificationText === 'Давайте!') {setEditNotificationText('Никогда!');};
  }

  function handleTlgSubmit(e) {
    e.preventDefault();
    console.log(editFormForTlg);
    handleEditUserTlg(editFormForTlg);
    setTlg(true);
  }

  function handleLinkClick() {
    window.open("https://t.me/how_to_flower_bot");
  }

  /*useEffect(()=> {
    console.log(currentFlower);
    console.log(editNotificationInputRef.current);
  }, [editFlowerModalIsOpen])*/

  useEffect(()=> {
    setEditFormForTlg({ 
      email: userDataRequestRes.email,
      username: userDataRequestRes.username,
      first_name: userDataRequestRes.first_name,
      chat_id: userDataRequestRes.chat_id
    });
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
          id="editFlowerNameProfile" 
          name="name" 
          minLength='2' 
          maxLength='40' 
          placeholder="Имя цветка"
          type="text" 
          value={editForm.name}
          onChange={onNameChange} 
          className="profile__text profile__row-container" 
          pattern="[a-zA-ZA-Zа-яА-ЯЁё1234567890\-\s]{2,30}"/>
        <p>
          Хотите изменить вид своего цветка? Выберите новый
        </p>
        <select 
          name="flower_type"
          id="editFlowerTypeProfile"
          defaultValue={findFlowerType()}
          onChange={onTypeChange}
          className="editFlowerForm__select"
          >
          {((plants !== [] )  
            && plants.map((item, i) => (
              <>
                <option key={i} value={item.name}>{item.name}</option>
              </>
            ))
          )}
        </select>
        <p>
          Напоминать о времени поливки в Телеграм?
        </p>
        <div className="editFlowerForm__buttonBlock">
          <input 
            type="checkbox" 
            name="notification" 
            id="notificationEditForm"
            ref={editNotificationInputRef} 
            onChange={onNotificationChange} 
            onClick={onNotificationClick}
            defaultChecked={editForm.notification}
          /> 
          <label htmlFor="notification">
            {editNotificationText}
          </label>
        </div>
        {(userDataRequestRes.chat_id === '' && editForm.notification) && (
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
                value={editFormForTlg.chat_id}
                onChange={onTlgChange} 
                className="profile__text profile__row-container"/>
              <button 
                type="submit" 
                onClick={handleTlgSubmit}
                className="addFlowerForm__button">Вот он</button>
            </form> 
          </>
        )}
        {(userDataRequestRes.chat_id !== '' && editForm.notification && tlg) && (
          <>
            <p>Спасибо! Теперь зайдите в <span className="addFlowerForm__botLink" onClick={handleLinkClick}>наш бот </span>и скажите ему что-нибудь, чтобы он мог отправлять Вам сообщения</p>
          </>
        )}
        <div className="editFlowerForm__buttonBlock">
          <button className="editFlowerForm__button" type="submit">Сохранить изменения</button>
          <button className="editFlowerForm__deleteButton" type="button" onClick={deleteFlower1}>        
            <img 
              src={basket} 
              alt="Иконка корзины (удаление карточки)" 
              className="editFlowerForm__deleteIcon"
            />
          </button>
        </div>
      </form>}
    </>
  )
}

export default EditFlowerForm;
