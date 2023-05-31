import React from 'react';
import './NavTab.css';

function NavBar() {

  return (
    <nav>
      <div className="NavTab__content">
        <ul className="navTab__block">
          <li className="navTab__link-point">
            <a href="#AboutProject" className="navTab__link">
              О Проекте
            </a>
          </li>
          <li className="navTab__link-point">
            <a href="#Techs" className="navTab__link">
              Технологии
            </a>
          </li>
          <li className="navTab__link-point">
            <a href="#AboutMe" className="navTab__link">
              Студент
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
