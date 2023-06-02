import { useSelector, useDispatch } from 'react-redux';
import './PlantPage.css';
import Header from '../../components/Header/Header.jsx';
import HeaderLogin from '../../components/Header/HeaderLogin.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function PlantPage(props) {
  const {loggedIn} = props;
  const { currentPlant } = useSelector(state => state.currentPlantReducer);
  const dispatch = useDispatch();

  /*function handleClick(ingredient) {
    dispatch(setCurrentIngredient(ingredient));
    onIngredientClick(ingredient);
  }*/
  
  return ( <>
    {!loggedIn &&
      <Header/>
    }
    {loggedIn &&
      <HeaderLogin/>
    }
    {(currentPlant !== undefined) && 

    <div className="plantPage__card" >
      <img src={currentPlant.image} alt="Изображение цветка" className="plantPage__image"/>
      <div className="plantPage__text-container">
        <h3 className="plantPage__title">{currentPlant.name}</h3>
        <div className="plantPage__row">
          <p className="plantPage__subtitle">Советы по поливу:</p>
          <p className="plantPage__text">{currentPlant.watering.substring(7)}</p>
        </div>
        <div className="plantPage__row">
          <p className="plantPage__subtitle">Освещение:</p>
          <p className="plantPage__text">{currentPlant.light.substring(10)}</p>
        </div>
        <div className="plantPage__row">
          <p className="plantPage__subtitle">Температурный режим:</p>
          <p className="plantPage__text">{currentPlant.temperature.substring(13)}</p>
        </div>
        <div className="plantPage__row">
          <p className="plantPage__subtitle">Подбор горшка:</p>
          <p className="plantPage__text">{currentPlant.pot.substring(6)}</p>
        </div>
        <div className="plantPage__row">
          <p className="plantPage__subtitle">Отношения с животными:</p>
          <p className="plantPage__text">{currentPlant.pet_friendly}</p>
        </div>
      </div>
    </div>}
    <Footer/>
  </>)
}

export default PlantPage;
