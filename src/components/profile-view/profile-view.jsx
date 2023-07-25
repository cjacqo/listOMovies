import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function ProfileView({ movies, onUpdatedUserInfo }) {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  console.log(user)
  
  // const favoriteMovieList = movies.filter(m => user.FavoriteMovies.include(m._id))

  return (
    <div>Profile View</div>
  )
  
}