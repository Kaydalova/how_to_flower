
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__title">
          Пет-проект. Сделан руками ради интереса и практики
        </p>
        <div className='footer__text-block'>
            <p className="footer__text footer__text-year">
              &copy; 2023
            </p>
          <div className='footer__row'>
            <a 
              className="footer__text footer__link" 
              href="https://github.com/Kaydalova" 
              target="_blank">
                🦾 Backend - Kaydalova
            </a>
            <a 
              className="footer__text footer__link" 
              href="https://github.com/krokodila888" 
              target="_blank">
                🔥 Frontend - krokodila888
            </a>
            <a 
              className="footer__text footer__link" 
              href="https://sun9-60.userapi.com/impf/c847122/v847122321/183a4a/3BPk4rs64eY.jpg?size=1080x1080&quality=96&sign=7fa387725bdc53193e2d8316d003e25f&c_uniq_tag=4SUOw5mrQeWuxguanQ9OpmOYAeIu5IOygZnMEEoS_oU&type=album" 
              target="_blank">
                ⚡ Project manager - тут пока пусто
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
  
export default Footer;