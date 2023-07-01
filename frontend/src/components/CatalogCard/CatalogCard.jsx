import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './CatalogCard.css';
import { setCurrentPlant } from '../../services/actions/currentPlant';

function CatalogCard(props) {
  const {plant } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  function handleClick(plant) {
    console.log(plant);
    dispatch(setCurrentPlant(plant));
    navigate(`/catalog/:${plant.id}`);
  }
  
  return (
    <li className="catalogCard__card" onClick={() => handleClick(plant)}>
      <img src={plant.image} alt="Изображение цветка" className="catalogCard__image"/>
      <div className="catalogCard__text-container">
        <h3 className="catalogCard__title">{plant.name}</h3>
        <div className="catalogCard__row">
          <p onClick={() => handleClick(plant)} className="catalogCard__subtitle">Больше информации</p>
        </div>
      </div>
    </li>
  )
}

export default CatalogCard;
