import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../../pages/Main/Main.jsx';
import PageNotFound from '../../pages/PageNotFound/PageNotFound.jsx';
import Login from '../../pages/Login/Login.jsx';
import Register from '../../pages/Register/Register.jsx';
import Profile from '../../pages/Profile/Profile.jsx';
import Catalog from '../../pages/Catalog/Catalog.jsx';
import { api } from '../../utils/Api';
import ProtectedRoute from '../ProtectedRoute';
import { ERROR_MESSAGE } from '../../utils/constants.js';
import { plantsCatalog } from '../../utils/constants.js';
import { getPlants } from '../../services/actions/plants';
import { getUserData } from '../../services/actions/auth';
import './App.css';

function App() {

  const [flowers, setFlowers] = useState([]);  
  const [loggedIn, setLoggedIn] = useState(false);
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [editUserModalIsOpen, setEditUserModalIsOpen] = React.useState(false);
  const [editFlowerModalIsOpen, setEditFlowerModalIsOpen] = React.useState(false);
  const [addFlowerModalIsOpen, setAddFlowerModalIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { plants } = useSelector(state => state.plantsReducer);
  const { userDataRequestRes, sendLogin } = useSelector(state => state.authReducer);

  useEffect(()=> {
    dispatch(getPlants());
  }, [])

  useEffect(()=> {
    console.log(plants);
  }, [plants])

  useEffect(() => {
    // console.log(sendLogin.authtoken !== undefined);
    if (sendLogin.auth_token !== undefined) 
    setLoggedIn(true)
    else setLoggedIn(false)
  }, [sendLogin])

  useEffect(()=> {
    dispatch(getPlants());
  }, [])

  function closeModal() {
    setEditUserModalIsOpen(false);
    setEditFlowerModalIsOpen(false);
    setAddFlowerModalIsOpen(false);
  }

  useEffect(() => {
    if (sendLogin.auth_token && (userDataRequestRes === {})) {
      console.log(localStorage);
      dispatch(getUserData());
 } }, [sendLogin]);

  // проверка токена
/*  function handleCheckToken() {
    mainApi.checkToken()
    .then(() => {
      setLoggedIn(true);
      getUserData()
    })
    .catch((err) => {
      setLoggedIn(false);
      console.log(err)
    })
  }

  useEffect(() => {
    handleCheckToken()
  }, [])

  useEffect(() => {
    setUserErrorMessage('')
  }, [])*/

  return (
    <>
      <div className="page">
          <Routes>
            <Route 
              exact path="/" 
              element={
                <Main 
                  loggedIn={loggedIn}/>
              }>  
            </Route>
            <Route 
              path="/sign-in" 
              element={
                <Login 
                  userErrorMessage={userErrorMessage}
                  setUserErrorMessage={setUserErrorMessage}/>
              }>
            </Route>
            <Route 
              path="/sign-up" 
              element={<Register 
                userErrorMessage={userErrorMessage}
                setUserErrorMessage={setUserErrorMessage}/>}>
            </Route>
            <Route 
              path="*" 
              element={
                <PageNotFound/>
              }>
            </Route>
            <Route 
              exact path="/catalog" 
              element={
                <Catalog loggedIn={loggedIn}/>
              }>
            </Route>
            <Route 
              exact path="/profile" 
              element={
                <ProtectedRoute 
                loggedIn={loggedIn}>
                  <Profile 
                    loggedIn={loggedIn}
                    setLoggedIn={setLoggedIn}
                    closeModal={closeModal}
                    editUserModalIsOpen={editUserModalIsOpen}
                    setEditUserModalIsOpen={setEditUserModalIsOpen}
                    editFlowerModalIsOpen={editFlowerModalIsOpen}
                    setEditFlowerModalIsOpen={setEditFlowerModalIsOpen}
                    addFlowerModalIsOpen={addFlowerModalIsOpen}
                    setAddFlowerModalIsOpen={setAddFlowerModalIsOpen}
                    userErrorMessage={userErrorMessage}
                    setUserErrorMessage={setUserErrorMessage} />
                </ProtectedRoute>}>      
            </Route>
          </Routes>
          
      </div>
    </>
  );
}

export default App;
