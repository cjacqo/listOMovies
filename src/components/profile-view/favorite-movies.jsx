import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'

export function FavoriteMovies({ favoriteMoviesList, removeFav }) {
  return (
    <Row>
      <Col xs={12}>
        <h2>Favorite Movies</h2>
      </Col>
      <Row>
        {favoriteMoviesList.map(movie => {
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
        })}
      </Row>
    </Row>
  )
}