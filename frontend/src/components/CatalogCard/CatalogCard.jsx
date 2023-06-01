import { useSelector, useDispatch } from 'react-redux';
import './CatalogCard.css';
//import { setCurrentIngredient } from '../../services/actions/currentIngredient';

function CatalogCard(props) {
  const {plant } = props;
  /*const { currentPlant } = useSelector(state => state.catalogPlantsReducer);
  const dispatch = useDispatch();

  function handleClick(ingredient) {
    dispatch(setCurrentIngredient(ingredient));
    onIngredientClick(ingredient);
  }*/
  
  return (
    <li className="catalogCard__card" >
      <img src={plant.image} alt="Изображение цветка" className="catalogCard__image"/>
      <div className="catalogCard__text-container">
        <h3 className="catalogCard__title">{plant.name}</h3>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Советы по поливу:</p>
          <p className="catalogCard__text">{plant.watering}</p>
        </div>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Освещение:</p>
          <p className="catalogCard__text">{plant.light}</p>
        </div>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Температурный режим:</p>
          <p className="catalogCard__text">{plant.temperature}</p>
        </div>
        <div className="catalogCard__row">
          <p className="catalogCard__subtitle">Подбор горшка:</p>
          <p className="catalogCard__text">{plant.pot}</p>
        </div>
      </div>
    </li>
  )
}

export default CatalogCard;
