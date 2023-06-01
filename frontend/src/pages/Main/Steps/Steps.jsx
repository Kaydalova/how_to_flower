import React from 'react';
import './Steps.css';
import step2 from '../../../images/step2.png';
import step4 from '../../../images/step4.png';
import step5 from '../../../images/step5.png';
import step1 from '../../../images/step1.png';
import sproud from '../../../images/sproud.png';
import step3 from '../../../images/step3.png';
import tlg from '../../../images/tlg.png';
import pots from '../../../images/pots.png';

function Steps() {

  return (
    <section className="steps__content" id="Steps">
      <div className="steps__content-inside">
        <h2 className="steps__main-title">
          Как это работает
        </h2>
        <div className="steps__text-block">
        <div className="steps__column">
          <p className="steps__title">
            Step 1. Регистрируетесь
          </p>
          <p className="steps__text">
            Никаких рекламных рассылок или новостей, только напоминания о поливе
          </p>
          <img 
            src={sproud} 
            alt="Маленький цветок" 
            className="steps__photo1" />
        </div>
        <div className="steps__column">
          <p className="steps__title">
            Step 2. Добавляете цветы в профиль
          </p>
          <p className="steps__text">
            Виталий, № 5, Иннокентий, Доходяга, ????
          </p>
          <img 
            src={pots} 
            alt="Цветы в горшках" 
            className="steps__photo2" />
        </div>
        <div className="steps__column">
          <p className="steps__title">
            Step 3. Выставляете время напоминания о поливе
          </p>
          <p className="steps__text">
            Виталий живет дома, № 5 - на работе, Доходяга - на лестничной клетке, ???? вообще соседский. Во вторник удаленка, в пятницу сейшн, но больше не надо держать это все в уме
          </p>
          <img 
            src={step3} 
            alt="Много леек" 
            className="steps__photo2" />
        </div>
        <div className="steps__column">
          <p className="steps__title">
            Step 4. Получаете напоминания в Telegram
          </p>
          <p className="steps__text">
            А еще можете посмотреть советы по освещению и влажности, если все же знаете, кто у вас
          </p>
          <img 
          src={tlg} 
          alt="Лого Telegram" 
          className="steps__photo1" />
        </div>
        <div className="steps__column">
          <p className="steps__title">
            Step 5. Профит
          </p>
          <p className="steps__text">
            Виталий колосится и плодоносит, ???? жив, мама потрясена, вы великолепны
          </p>
          <img 
            src={step5} 
            alt="Цветы в горшках" 
            className="steps__photo" />
        </div>
      </div>
      </div>
    </section>
  );
}  

export default Steps;
