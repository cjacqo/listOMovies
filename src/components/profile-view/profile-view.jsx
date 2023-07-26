import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserInfo } from './user-info'
import { FavoriteMovies } from './favorite-movies'
import { UpdateUser } from './update-user'

export function ProfileView({ movies, user }) {

  const favoriteMoviesList = movies.filter(m => user.FavoriteMovies.includes(m._id))

  const handleSubmit = (e) => {}
  const handleUpdate = (e) => {}

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.UserName} email={user.Email} />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser user={user} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {favoriteMoviesList.length !== 0 ? (
        <FavoriteMovies favoriteMoviesList={favoriteMoviesList} />
      ) : (
        <div>No favorite movies</div>
      )}
    </Container>
  )
}

ProfileView.propTypes = {
  movies: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}