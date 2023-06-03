import React, { useEffect } from "react";
import '../Movies/Movies.css';
import SavedSearchForm from './SavedSearchForm/SavedSearchForm';
import Preloader from '../Movies/Preloader/Preloader';
import SavedMoviesCardList from './SavedMoviesCardList/SavedMoviesCardList.jsx';
import HeaderLogin from '../Header/HeaderLogin.jsx';
import Footer from '../Footer/Footer.jsx';

function SavedMovies(props) {

  const {
    savedMovies, 
    setFilteredSavedMovies, 
    isLoading, 
    searchInSaved, 
    setIsCheckedForSaved, 
    isCheckedForSaved, 
    onMovieDelete, 
    makeNewSearchInSaved, 
    filteredSavedMovies, 
    savedMoviesErrorMessage
  } = props;

  useEffect(() => {
    setFilteredSavedMovies([]);
  }, [])

  return (
    <section className="movies__component">
      <HeaderLogin/>
      <SavedSearchForm 
        makeNewSearchInSaved={makeNewSearchInSaved} 
        isCheckedForSaved={isCheckedForSaved}
        setIsCheckedForSaved={setIsCheckedForSaved} 
      />
      <Preloader 
        isLoading={isLoading}
      />
      <SavedMoviesCardList 
        savedMovies={savedMovies} 
        searchInSaved={searchInSaved} 
        onMovieDelete={onMovieDelete} 
        filteredSavedMovies={filteredSavedMovies} 
        savedMoviesErrorMessage={savedMoviesErrorMessage}
        isCheckedForSaved={isCheckedForSaved}
      />
      <Footer />
    </section>
    )
  }

export default SavedMovies; 
