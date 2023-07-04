import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../images/logo.png';
import { login, getUserData } from '../../services/actions/auth';
import { getUserFlowers } from '../../services/actions/getUserFlowers';
import { useSelector, useDispatch } from 'react-redux';

function Login (props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const {/*handleLogin, loginUser, */userErrorMessage, setUserErrorMessage} = props;
  const emailInput = document.getElementById('emailLogin');
  const passwordInput = document.getElementById('passwordLogin');  
  const submitButton = document.getElementById('buttonLogin')
  const emailErrorSpan = document.getElementById('emailSpanLogin')
  const passwordErrorSpan = document.getElementById('passwordSpanLogin')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, sendLogin, sendLoginRequest, sendLoginFailed } = useSelector(state => state.authReducer);
 
  /*function handleSubmit(e) {
    e.preventDefault();
    const data = {password, email};
    loginUser(data);
    handleLogin();
  }*/

  /*useEffect(() => {
    setUserErrorMessage('')
  }, [])*/

  function validate() {
    if(emailInput && passwordInput && !(emailInput.validationMessage || passwordInput.validationMessage)) 
    return (submitButton.classList.remove('login__button-disabled'), submitButton.classList.add('login__button-active'), submitButton.disabled = false); 
    else if (emailInput && passwordInput) return (submitButton.classList.remove('login__button-active'), submitButton.classList.add('login__button-disabled'), submitButton.disabled = true)
  }

  function handleLogin(e) {
    e.preventDefault();
    const data = {password, email};
    dispatch(login(data));
  }

  useEffect(() => {
    if (sendLogin.auth_token) {
      localStorage.setItem('token', sendLogin.auth_token);
      dispatch(getUserFlowers());
      dispatch(getUserData());
      navigate('/profile');
 } }, [sendLogin]);
  
  return(
    <section className="login__background">
      <div className="login__container">
        <Link to="/">
          <img
            src={logo}
            alt="Логотип"
            className="login__logo"
          />
        </Link>
        <p className="login__title">
          С возвращением, цветовод!
        </p>
        <form onSubmit={e => {handleLogin(e)}} className="login__form-container">
          <span className="login__text">
            E-mail
          </span>
          <input 
            formNoValidate
            required 
            id="emailLogin" 
            name="email" 
            placeholder="E-mail" 
            type="email" 
            value={email} 
            onChange={e => {
              setEmail(e.target.value);
              validate();
              if (emailInput) 
                return (emailErrorSpan.textContent = emailInput.validationMessage);}}
            className="login__input"/>
          <span 
            className="login__text input-emailLogin-error login__input-error" 
            id='emailSpanLogin'> 
          </span>
          <span className="login__text">
            Пароль
          </span>
          <input 
            formNoValidate
            required 
            id="passwordLogin" 
            name="password" 
            type="password" 
            placeholder="Пароль" 
            value={password} 
            onChange={e => {
              setPassword(e.target.value);
              validate();
              if (passwordInput) 
                return (passwordErrorSpan.textContent = passwordInput.validationMessage);
            }}
            className="login__input" />
          <span 
            className="login__text input-passwordLogin-error login__input-error" 
            id='passwordSpanLogin'> 
          </span>
          {userErrorMessage !== '' && 
            <p className="login__text-error">
              {userErrorMessage}
            </p>
          }
          <button 
            type="submit"
            id="buttonLogin"
            disabled
            className="login__button login__button-active button_type_primary">
              Войти
          </button>
        </form>
        <div className="login__link-container">
          <p className="login__underbottom-text">
            Ещё не зарегистрированы?
          </p>
          <Link 
            to="/sign-up" 
            className="login__underbottom-text login__link">
              Регистрация
          </Link>
        </div>
      </div>  
    </section>
  )
}

export default Login;