import React from 'react';
import plant1 from '../../../images/plant1.png';
import mainplant from '../../../images/main-plant.png';
import './AboutUs.css';

function AboutMe() {

  return (
    <section className="aboutUs__content" id="AboutUs">
      <div className='aboutUs__text-block'>
        <div className='aboutUs__column'>

            <p className="aboutUs__status-text">
              Это Василий (он спатифиллум, но это не точно)
            </p>
            <p className="aboutUs__text">
              Его подарила вам мама (или любимые коллеги), и теперь он живет с вами. Вы не хотите, чтобы он умер (по крайней мере сразу).
            </p>
            <p className="aboutUs__text">
              Или у вас 40 горшков с Василиями и 15 - с Зинаидами, и каждой заразе нужен свой режим полива, а вам и так нужно помнить миллион вещей. Для одного горшка это тоже актуально.
            </p>
            <p className="aboutUs__text">
              И вот вы здесь. Попробуем немного все упростить.
            </p>
          </div>

        <img 
          src={mainplant} 
          alt="Жизнерадостный цветок в горшке" 
          className="aboutUs__photo" />
        </div>

    </section>
  );
}  

export default AboutMe; 