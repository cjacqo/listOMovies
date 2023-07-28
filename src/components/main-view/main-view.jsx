import { useEffect, useState } from 'react'
import { LoginView } from '../login-view/login-view'
import { MovieView } from '../movie-view/movie-view'
import { MovieCard } from '../movie-card/movie-card'
import { SignupView } from '../signup-view/signup-view'
import { NavigationBar } from '../naviation-bar/navigation-bar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProfileView } from '../profile-view/profile-view'
import { GenresFilter } from './genres-filter'

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const storedToken = localStorage.getItem('token')
  const [user, setUser] = useState(storedUser ? storedUser : null)
  const [token, setToken] = useState(storedToken ? storedToken : null)
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [favMovies, setFavMovies] = useState(user?.FavoriteMovies || [])
  const [filter, setFilter] = useState(false)
  const [genres, setGenres] = useState(false)


  useEffect(() => {
    if (!token) return
    fetchAllMovies()
    fetchAllGenres()
  }, [token])

  useEffect(() => {
    if (!user) setFavMovies([])
    else setFavMovies(user.FavoriteMovies || [])
  }, [user])

  useEffect(() => {
    if (filter === 'All') setFilteredMovies(movies)
    else {
      const filteredMovies = movies.filter(movie => movie.Genre === filter)
      setFilteredMovies(filteredMovies)
    }
  }, [filter])

  const fetchAllMovies = () => {
    fetch('https://list-o-movies-311c22237892.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setMovies(data)
        setFilteredMovies(data)
      })
  }
  
  const fetchAllGenres = () => {
    fetch('https://list-o-movies-311c22237892.herokuapp.com/genres', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setGenres(data)
      })
  }

  const handleAddToFavs = async (movieId) => {
    if (favMovies.includes(movieId)) {
      alert('This movie is already in your favorites')
      return
    }

    try {
      await fetch(`https://list-o-movies-311c22237892.herokuapp.com/users/${user.UserName}/movies/${movieId}`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
      const tempFavMovies = [...favMovies, movieId]
      setFavMovies(tempFavMovies)
      updateFavoriteMovies(tempFavMovies)
    } catch (e) {
      console.error('Error:', e)
      alert('There was an error adding movie to favorites')
    }
  }

  const handleRemoveFromFavs = async (movieId) => {
    if (!favMovies.includes(movieId)) {
      alert('This movie is not in your favorites list')
      return
    }

    try {
      await fetch(`https://list-o-movies-311c22237892.herokuapp.com/users/${user.UserName}/movies/${movieId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
      const tempFavMovies = favMovies.filter(id => id !== movieId)
      setFavMovies(tempFavMovies)
      updateFavoriteMovies(tempFavMovies)
    } catch (e) {
      console.log('Error:', e)
      alert('There was an error removing movie from favorites')
    }
  }

  const updateFavoriteMovies = updatedFavMovies => {
    user.FavoriteMovies = updatedFavMovies
    localStorage.setItem('user', JSON.stringify(user))
  }

  const updateUser = user => {
    setUser(user)
    localStorage.setItem('user', JSON.stringify(user))
  }

  const handleUserLogout = () => {
    setUser(null)
    setToken(null)
    localStorage.clear()
  }

  const handleGenreChange = (e) => {
    const selectedGenre = e.target.value
    setFilter(selectedGenre)
  }

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => handleUserLogout()} />
      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/signup'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/login'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/movies/:movieId'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      favMovies={favMovies}
                      onAddToFavorites={handleAddToFavs}
                      onRemoveFromFavorites={handleRemoveFromFavs}  />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    <GenresFilter
                      genres={genres}
                      handleGenreChange={(e) => handleGenreChange(e)} />
                    {filteredMovies.map(movie => (
                      <Col className='mb-4' key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          fav={favMovies.includes(movie._id)}  />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            path='/profile'
            element={
              <>
                {!user ? (
                  <Navigate to='/login' replace />
                ) : (
                  <ProfileView
                    movies={movies}
                    user={user}
                    updateUser={updateUser}
                    handleUserLogout={handleUserLogout} />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  )
}