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

    <div className="catalogCard__card" >
      <img src={currentPlant.image} alt="Изображение цветка" className="catalogCard__image"/>
      <div className="catalogCard__text-container">
        <h3 className="catalogCard__title">{currentPlant.name}</h3>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Советы по поливу:</p>
          <p className="catalogCard__text">{currentPlant.watering}</p>
        </div>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Освещение:</p>
          <p className="catalogCard__text">{currentPlant.light}</p>
        </div>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Температурный режим:</p>
          <p className="catalogCard__text">{currentPlant.temperature}</p>
        </div>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Подбор горшка:</p>
          <p className="catalogCard__text">{currentPlant.pot}</p>
        </div>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Отношения с животными:</p>
          <p className="catalogCard__text">{currentPlant.pet_friendly}</p>
        </div>
      </div>
    </div>}
    <Footer/>
  </>)
}

export default PlantPage;
