import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserInfo } from './user-info'
import { FavoriteMovies } from './favorite-movies'
import { UpdateUser } from './update-user'

export function ProfileView({ movies, user, setUser }) {

  const favoriteMoviesList = movies.filter(m => user.FavoriteMovies.includes(m._id))

  const handleUpdate = (e, updatedUser) => {
    e.preventDefault()
    fetch(`https://list-o-movies-311c22237892.herokuapp.com/users/${user.UserName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(updatedUser)
    }).then(res => {
      console.log(res)
      if (res.ok) return res.json()
      else alert('Update failed')
    })
  }

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
              <UpdateUser user={user} handleSubmit={handleUpdate} />
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