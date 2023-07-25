import React from 'react'
import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'

export function FavoriteMovies() {
  return (
    <Row>
      <h2>Favorite Movies</h2>
      {favoriteMoviesList.map(movie => {
        return (
          <div key={movie._id}>
            <img src={movie.ImagePath} alt={movie.Title} />
            <Link>
              <h4>{movie.Title}</h4>
            </Link>
            <button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from list</button>
          </div>
        )
      })}
    </Row>
  )
}