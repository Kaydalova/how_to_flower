import logo from '../../images/logo.png';
import leaf1 from '../../images/leaf1.png';
import leaf2 from '../../images/leaf2.png';
import leaf3 from '../../images/leaf3.png';
import leaf7 from '../../images/leaf7.png';
import leaf5 from '../../images/leaf5.png';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import 'animate.css';
import './Header.css';
import React from "react";
import { users } from '../../utils/constants.js';
import { removeTokenRequest, removeUserData, removeLogOutData, removeLogin, removeRegister } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

function HeaderLogin(props) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {setLoggedIn} = props;
  const [isBigger, setIsBigger] = React.useState(true);
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (window.innerWidth < 621) {
      setIsBigger(false);      
    }
    if (window.innerWidth >= 621) {
      setIsBigger(true);      
    }
  }, [])

  function handleLogout() {
    dispatch(removeUserData());
    dispatch(removeLogOutData());
    dispatch(removeLogin());
    dispatch(removeRegister());
    localStorage.clear();
    navigate("/")
  }

  return (
    <header className="header">
      {window.innerWidth > 621 ? 
      (<>
      <div className="header__content">
        <NavLink to="/catalog" end={true} className={({ isActive }) => 
          (isActive ? 'header__link header__first-link header__logo-block-main' : "header__first-link header__link header__link-font")}>
            <img
              src={leaf7}
              alt="Листик растет из горшка"
              className="header__leaf"
            />
            <p className="header__link-text">
              Справочник
            </p>
        </NavLink>
        <NavLink to="/" end={true} className={({ isActive }) => 
            (isActive ? 'header__logo-block header__logo-block-main' : "header__logo-block header__link-font header__logo-inactive")}>
          <img
            src={logo}
            alt="Логотип"
            className="header__logo"
          />
          <h2 className="header__title header__link-text">
            How to flower
          </h2>
        </NavLink>
        <div className="header__right-block">
          <NavLink to="/profile" 
            className={({ isActive }) => (isActive ? 'header__link header__logo-block-main' : "header__link header__link-font")}>
            <img
              src={leaf5}
              alt="Листик растет из горшка"
              className="header__leaf"
            />
            <p className="header__link-text">
              Профиль
            </p>            
          </NavLink>
          <Link 
            to="/" 
            className="header__link header__link-font"
            onClick={handleLogout}>
            <img
              src={leaf2}
              alt="Листик растет из горшка"
              className="header__leaf"
            />
            <p className="header__link-text">
              Выход
            </p>            
          </Link>
        </div>      
      </div>      
      <div className='header__underline'></div> 
      </>) : (
      <>
      <div className="header__content">
        <NavLink to="/" end={true} className={({ isActive }) => 
            (isActive ? 'header__logo-block header__logo-block-main' : "header__logo-block header__link-font header__logo-inactive")}>
          <img
            src={logo}
            alt="Логотип"
            className="header__logo"
          />
          <h2 className="header__title header__link-text">
            How to flower
          </h2>
        </NavLink>
        <div className="header__right-block">
          <NavLink to="catalog" end={true} className={({ isActive }) => 
            (isActive ? 'header__link header__logo-block-main header__first-link' : "header__first-link header__link header__link-font")}>
              <img
                src={leaf7}
                alt="Листик растет из горшка"
                className="header__leaf"
              />
              <p className="header__link-text">
                Справочник
              </p>
          </NavLink>
          <NavLink to="/profile" 
            className={({ isActive }) => (isActive ? 'header__link header__logo-block-main' : "header__link header__link-font")}>
            <img
              src={leaf5}
              alt="Листик растет из горшка"
              className="header__leaf"
            />
            <p className="header__link-text">
              Профиль
            </p>            
          </NavLink>
          <Link 
            to="/" 
            className="header__link header__link-font"
            onClick={handleLogout}>
            <img
              src={leaf2}
              alt="Листик растет из горшка"
              className="header__leaf"
            />
            <p className="header__link-text">
              Выход
            </p>            
          </Link>
        </div>
      </div>
      <div className='header__underline'></div> 
      </>)}
    </header>
  );
}
  
  export default HeaderLogin;
