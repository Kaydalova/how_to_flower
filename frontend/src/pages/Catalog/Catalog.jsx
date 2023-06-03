import React, { useEffect, useState } from "react";
import Header from '../../components/Header/Header.jsx';
import HeaderLogin from '../../components/Header/HeaderLogin.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import CatalogCard from '../../components/CatalogCard/CatalogCard.jsx';
import SearchForm from '../../components/SearchForm/SearchForm.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getPlants } from '../../services/actions/plants';
import './Catalog.css';

function Catalog(props) {

  const {loggedIn} = props;
  const [search, setSearch] = useState('');
  const { plants } = useSelector(state => state.plantsReducer);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const dispatch = useDispatch();

  // поиск в каталоге - временно. потом переделаю на Redux
  function makeNewSearch(data) {
    //console.log(data);
    setSearch(data);
  }

  function showMorePlants() {
    dispatch(getPlants());
  }

  function showAllPlants() {
    setFilteredPlants(plants)
  } 

  useEffect(() => {
    /*console.log(filteredPlants);
    console.log(search);*/
    if (filteredPlants && filteredPlants.length === 0 && search !== "") {
      console.log(plants.filter((item) => {return (item.name.toLowerCase().includes(search.toLowerCase()))}))
    };
    if (search !== "")
    setFilteredPlants(plants.filter((item) => {return (item.name.toLowerCase().includes(search.toLowerCase()))}))
    else setFilteredPlants(plants)
  }, [search])

  return (
    <div className="catalog__section">
      {!loggedIn &&
        <Header/>
      }
      {loggedIn &&
        <HeaderLogin/>
      }
      <section>
        <SearchForm 
          makeNewSearch={makeNewSearch}
          search={search}
          filteredPlants={filteredPlants}
        />
      <ul className="catalog__container">
        {((filteredPlants !== []) && (filteredPlants !== null) && (filteredPlants !== undefined)) 
        && filteredPlants.map((item) => (
            <CatalogCard key={item.id} 
              plant = {item}/>
        ))}
      </ul>
      </section>
      {filteredPlants !== plants && 
      <>
        <button 
          onClick={showAllPlants}
          className="catalog__button">
            Показать все
        </button>
        <button 
          onClick={showMorePlants}
          className="catalog__button">
            More plants
        </button>
          </>}
      <Footer/>
    </div>
  );
}  

export default Catalog;
