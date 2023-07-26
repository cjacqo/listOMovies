import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'

export function FavoriteMovies({ movies, favoriteMoviesList, onAddToFavorites }) {
  return (
    <Row>
      <Col xs={12}>
        <h2>Favorite Movies</h2>
      </Col>
      <Row>
        {
          favoriteMoviesList.map(movie => (
            <Col
              key={movie._id}
              xs={12}
              md={6}
              lg={3}>
              <MovieCard
                movie={movie}
                fav={favoriteMoviesList.includes(movie._id)}
                onAddToFavorites={onAddToFavorites} />
              {/* <img src={movie.ImagePath} alt={movie.Title} />
              <Link to={`/movies/${movie._id}`}>
                <h4>{movie.Title}</h4>
              </Link>
              <button variant="secondary" onClick={() => removeFav(movie._id)}>Remove from list</button> */}
            </Col>
          ))
        }
        {/* {favoriteMoviesList.map(movie => {
          return (
            <Col
              key={movie._id}
              xs={12}
              md={6}
              lg={3}>
              <img src={movie.ImagePath} alt={movie.Title} />
              <Link to={`/movies/${movie._id}`}>
                <h4>{movie.Title}</h4>
              </Link>
              <button variant="secondary" onClick={() => removeFav(movie._id)}>Remove from list</button>
            </Col>
          )
        })} */}
      </Row>
    </Row>
  )
}