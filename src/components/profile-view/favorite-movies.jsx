import PropTypes from 'prop-types'
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { MovieCard } from '../movie-card/movie-card'

export function FavoriteMovies({ favoriteMoviesList }) {
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
                fav={favoriteMoviesList.includes(movie._id)} />
            </Col>
          ))
        }
      </Row>
    </Row>
  )
}

FavoriteMovies.propTypes = {
  favoriteMoviesList: PropTypes.array.isRequired
}