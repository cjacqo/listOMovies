import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import { UserInfo } from './user-info'
import { FavoriteMovies } from './favorite-movies'
import { UpdateUser } from './update-user'

export function ProfileView({ movies, onUpdatedUserInfo }) {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  console.log(user)
  
  const favoriteMoviesList = movies.filter(m => user.FavoriteMovies.includes(m._id))

  const handleSubmit = (e) => {}
  const handleUpdate = (e) => {}

  return (
    <Container>
      <UserInfo name={user.UserName} email={user.Email} />
      {favoriteMoviesList === 0 ? (
        <FavoriteMovies favoriteMoviesList={favoriteMoviesList} />
      ) : (
        <div>No favorite movies</div>
      )}
      <UpdateUser user={user} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
    </Container>
  )
  
}