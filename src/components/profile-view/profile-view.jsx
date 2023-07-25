import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { UserInfo } from './user-info'
import { FavoriteMovies } from './favorite-movies'
import { UpdateUser } from './update-user'

export function ProfileView({ movies, onUpdatedUserInfo }) {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  
  const favoriteMoviesList = movies.filter(m => user.FavoriteMovies.includes(m._id))
  console.log(favoriteMoviesList.length)

  const handleSubmit = (e) => {}
  const handleUpdate = (e) => {}
  const removeFav = (id) => {
    let token = localStorage.getItem('token')
    let url = `https://list-o-movies-311c22237892.herokuapp.com/users/${user.UserName}/movies/${encodeURIComponent(id)}`

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(data => {
        localStorage.setItem('user', JSON.stringify(data))
        setUser(data)
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
              <UpdateUser user={user} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {favoriteMoviesList.length !== 0 ? (
        <FavoriteMovies
          favoriteMoviesList={favoriteMoviesList}
          removeFav={removeFav}
        />
      ) : (
        <div>No favorite movies</div>
      )}
    </Container>
  )
  
}