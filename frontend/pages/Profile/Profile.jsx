import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Profile.css';
import HeaderLogin from '../../components/Header/HeaderLogin.jsx';
import UserPlantCard from '../../components/UserPlantCard/UserPlantCard.jsx';
import Calendar1 from '../../components/Calendar/Calendar.jsx';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm.jsx';
import AddFlowerForm from '../../components/AddFlowerForm/AddFlowerForm.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Modal from "../../components/Modal/Modal";
import pensil from '../../images/pensil.png';
import { updateUserData, getUserData } from '../../services/actions/auth';
import { getMyFlowers, addNewFlower, editFlower } from '../../services/actions/plants';
import EditFlowerForm from '../../components/EditFlowerForm/EditFlowerForm.jsx';
import { removeCurrentFlower } from '../../services/actions/currentFlower';

function Profile (props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { plants, myFlowers } = useSelector(state => state.plantsReducer);
  const { editFlowerModalIsOpen } = useSelector(state => state.currentFlowerReducer);

  const {loggedIn, setLoggedIn, closeModal, editUserModalIsOpen/*, editFlowerModalIsOpen*/, addFlowerModalIsOpen, setEditUserModalIsOpen, setEditFlowerModalIsOpen, setAddFlowerModalIsOpen} = props;
  const { userDataRequestRes, sendLogin } = useSelector(state => state.authReducer);
  //const { userFlowers } = useSelector(state => state.getUserFlowersReduser);
  /*useEffect(() => {
    setUserErrorMessage('')
  }, [])
*/

  useEffect(()=> {
    dispatch(getMyFlowers());
  }, [myFlowers])

  function handleEditUserData(data) {
    dispatch(updateUserData(data));
    dispatch(getUserData());
    setEditUserModalIsOpen(false);
  }

  function handleAddFlower(data) {
    dispatch(addNewFlower(data));
    dispatch(getMyFlowers());
    setAddFlowerModalIsOpen(false);
  }

  function handleEditFlower(flowerID, data) {
    dispatch(editFlower(flowerID, data));
    dispatch(getMyFlowers());
    dispatch(removeCurrentFlower());
  }

  function handleEditUserModalOpen() {
    setEditUserModalIsOpen(true)
  }

  function handleAddUserModalOpen() {
    setAddFlowerModalIsOpen(true)
  }
  
  function handleCloseEditFlowerModal() {
    dispatch(removeCurrentFlower());
  }

  return(
    <div className="profile">
      <HeaderLogin 
        setLoggedIn={setLoggedIn}/>
      <div className="profile__title-block">
        <p className="profile__title">
          С возвращением, {userDataRequestRes.first_name}!
        </p>
        <img src={pensil} alt="Иконка исправления" className="profile__icon" onClick={handleEditUserModalOpen}/>
      </div>
      <section className="profile__content">
        <ul className="profile__plants-container scroll">
          {myFlowers !== null && myFlowers !== undefined && plants !== null && plants !== undefined && myFlowers.length !== 0 
          && myFlowers.map((item, i) => (
              <UserPlantCard key={i} 
                plant = {item}
              />
          ))}
          <li className="profile__card" >
            <p className="profile__image1">???</p>
            <div className="profile__text-container">
              <p className="profile__title profile__title1" onClick={handleAddUserModalOpen}>
                Добавить цветок
              </p>
            </div>
          </li>
        </ul>
        <div className="profile__calendar-block">
        <Calendar1/>
        </div>
      </section>
      <Footer/>
      <Modal
        isOpen={addFlowerModalIsOpen}
        onClose={closeModal}
        children={
          <AddFlowerForm handleAddFlower={handleAddFlower} addFlowerModalIsOpen={addFlowerModalIsOpen}/>}>
      </Modal>
      <Modal
        isOpen={editUserModalIsOpen}
        onClose={closeModal}
        children={
          <EditProfileForm handleEditUserData={handleEditUserData} editUserModalIsOpen={editUserModalIsOpen} />}>
      </Modal>
      <Modal
        isOpen={editFlowerModalIsOpen}
        onClose={handleCloseEditFlowerModal}
        children={
          <EditFlowerForm handleEditFlower={handleEditFlower} />}>
      </Modal>
    </div>
  )
}

export default Profile;
/*
      <Modal
        isOpen={editUserModalIsOpen}
        onClose={closeModal}
        children={
          <EditProfileForm />}>
      </Modal>
      <Modal
        isOpen={editFlowerModalIsOpen}
        onClose={closeModal}
        children={
          <EditFlowerForm />}>
      </Modal>
            <Modal
        isOpen={addFlowerModalIsOpen}
        onClose={closeModal}
        children={
          <AddFlowerForm />}>
      </Modal>
*/