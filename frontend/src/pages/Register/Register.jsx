import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Register.css';
import { useSelector, useDispatch } from 'react-redux';
import { register, getUserData } from '../../services/actions/auth';

function Register(props) {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const {registerUser, userErrorMessage, setUserErrorMessage} = props;
  const nameInput = document.getElementById('userNameRegister');
  const firstNameInput = document.getElementById('firstNameRegister');
  const emailInput = document.getElementById('emailRegister');
  const passwordInput = document.getElementById('passwordRegister');
  const submitButton = document.getElementById('buttonRegister');
  const nameErrorSpan = document.getElementById('usernameSpanRegister');
  const emailErrorSpan = document.getElementById('emailSpanRegister');
  const passwordErrorSpan = document.getElementById('passwordSpanRegister');
  const firstNameErrorSpan = document.getElementById('firstNameSpanRegister');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, sendRegister, sendRegisterRequest, sendRegisterFailed } = useSelector(state => state.authReducer);

  function handleSubmit(evt) {
    evt.preventDefault();
    const data = { 
      'username': userName,
      'first_name': firstName,
      'email': email, 
      'password': password
    };
    console.log(data);
    dispatch(register(data));
  }

  useEffect(() => {
    setUserErrorMessage('')
  }, [])

  React.useEffect(() => {
    if (sendRegister.username) {
      navigate("/sign-in")};
  }, [sendRegister]);

  function validate() {
    if(
      emailInput 
      && nameInput 
      && passwordInput
      && firstNameInput  
      && !(emailInput.validationMessage || nameInput.validationMessage || firstNameInput.validationMessage || passwordInput.validationMessage)) 
      return (
        submitButton.classList.remove('register__button-disabled'), 
        submitButton.classList.add('register__button-active'), 
        submitButton.disabled = false); 
    else if (
      emailInput 
      && nameInput 
      && firstNameInput
      && passwordInput) 
      return (
        submitButton.classList.remove('register__button-active'), 
        submitButton.classList.add('register__button-disabled'), 
        submitButton.disabled = true)
  }
  
  return (
    <>
      <section className='register__background'>
        <div className="register__container">
          <Link to="/">
            <img
              src={logo}
              alt="Логотип"
              className="register__logo"
            />
          </Link>
          <p className="register__title">
            Добро пожаловать!
          </p>
          <form 
            onSubmit={handleSubmit} 
            className="register__form-container">
            <span className="register__text">
              Ник
            </span>
            <input 
              className="register__input" 
              required
              pattern="[a-zA-ZА-Яа-я0-9Ёё\-\s]{2,30}"
              id="userNameRegister" 
              minLength='2' 
              maxLength='30' 
              name="UserName" 
              type="text" 
              placeholder="Ваш никнейм" 
              value={userName} 
              onChange={e => {
                setUserName(e.target.value);
                validate();
                if (nameInput) 
                  return (nameErrorSpan.textContent = nameInput.validationMessage);
              }} />
            <span className="register__text input-userNameRegister-error register__input-error" id='usernameSpanRegister'> </span>

            <span className="register__text">
              Имя
            </span>
            <input 
              className="register__input" 
              required
              pattern="[a-zA-ZА-Яа-яЁё\-\s]{2,30}"
              id="firstNameRegister" 
              minLength='2' 
              maxLength='30' 
              name="firstName" 
              type="text" 
              placeholder="Ваше имя" 
              value={firstName} 
              onChange={e => {
                setFirstName(e.target.value);
                validate();
                if (firstNameInput) 
                  return (firstNameErrorSpan.textContent = firstNameInput.validationMessage);
              }} />
            <span className="register__text input-firstNameRegister-error register__input-error" id='firstNameSpanRegister'> </span>

            <span className="register__text">
              E-mail
            </span>
            <input 
              required
              className="register__input" 
              id="emailRegister" 
              name="email" 
              type="email" 
              placeholder="E-mail" 
              value={email} 
              onChange={e => {
                setEmail(e.target.value);
                validate();
                if (emailInput) 
                  return (emailErrorSpan.textContent = emailInput.validationMessage);
              }} />
            <span 
              className="register__text input-emailRegister-error register__input-error" 
              id='emailSpanRegister'> </span>
            <span className="register__text">
              Пароль
            </span>
            <input 
              required
              className="register__input" 
              id="passwordRegister" 
              name="password" 
              type="password" 
              placeholder="Пароль" 
              value={password} 
              onChange={e => {
                setPassword(e.target.value); 
                validate();
                if(passwordInput) 
                  return (passwordErrorSpan.textContent = passwordInput.validationMessage);
              }} />
            <span 
              className="register__text input-emailLRegister-error register__input-error" 
              id='passwordSpanRegister'> </span>
            {userErrorMessage !== '' && 
              <p className="register__text-error">
                {userErrorMessage}
              </p>
            }
            <button 
              type="submit" 
              onSubmit={handleSubmit} 
              className="register__button register__button-active button_type_primary"
              disabled
              id="buttonRegister">
                Зарегистрироваться
            </button>
          </form>
          <div className="register__link-container">
            <p className="register__underbottom-text">
              Уже зарегистрированы?
            </p>
            <Link 
              to="/sign-in" 
              className="register__underbottom-text register__link">
                Войти
            </Link>
          </div>
        </div>  
      </section>
    </>
  );
}

export default Register;
