import React from "react";
import './SavedMoviesCard.css';

function SavedMoviesCard(props) {

  const {savedMovie, onMovieDelete} = props;
  const {nameRU, duration, image, trailerLink} = savedMovie;

  function handleDeleteClick(savedMovie) {
    onMovieDelete(savedMovie._id);
  } 

  return (
    <li className="savedMoviesCard__card">
      <a 
        href={trailerLink} 
        target="_blank" 
        className="savedMoviesCard__link">
        <div className="savedMoviesCard__title-container">
          <div className="savedMoviesCard__text-container">
            <h3 className="savedMoviesCard__title">
              {nameRU}
            </h3>
            <p className="savedMoviesCard__duration">
              {(`${Math.trunc(duration / 60)}ч ${duration % 60}м`)}
            </p>
          </div>
        </div>
        <img 
          src={image} 
          alt="Кадр из фильма" 
          className="savedMoviesCard__image"/>
      </a>
      <button 
        onClick={
          () => handleDeleteClick(savedMovie)
        } 
        type="button" 
        aria-label="delete" 
        className="savedMoviesCard__del-button">
      </button>
    </li>
  )
}

export default SavedMoviesCard;
