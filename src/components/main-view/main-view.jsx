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

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const storedToken = localStorage.getItem('token')
  const [user, setUser] = useState(storedUser ? storedUser : null)
  const [token, setToken] = useState(storedToken ? storedToken : null)
  const [movies, setMovies] = useState([])
  const [favMovies, setFavMovies] = useState(user?.FavoriteMovies || [])


  useEffect(() => {
    if (!token) return

    fetch('https://list-o-movies-311c22237892.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [token])

  useEffect(() => {
    if (!user) setFavMovies([])
    else setFavMovies(user.FavoriteMovies || [])
  }, [user])

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
      const tempFavMovies = favMovies.filter(movie => movie._id !== movieId)
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

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} />
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
                    {movies.map(movie => (
                      <Col className='mb-4' key={movie._id} md={3}>
                        <MovieCard
                          movie={movie}
                          fav={favMovies.includes(movie._id)}
                          onAddToFavorites={movieId => handleAddToFavs(movieId)}
                          onRemoveFromFavorites={movieId => handleRemoveFromFavs(movieId)}  />
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
                    favMovies={favMovies}
                    onAddToFavorites={handleAddToFavs}
                    onRemoveFromFavorites={handleRemoveFromFavs}
                    user={user} />
                )}
              </>
            }
          />
          {/* {!user ? (
            <>
              <Col className='text-bg-dark'>
                <LoginView onLoggedIn={(user, token) => {
                  setUser(user)
                  setToken(token)
                }} />
              </Col>
              <Col className='text-center align-self-center' md={1}>
                <h4>Or</h4>
              </Col>
              <Col className='text-bg-dark'>
                <SignupView />
              </Col>
            </>
          ) : selectedMovie ? (
            <Col md={8}>
              <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
              />
            </Col>
          ) : movies.length === 0 ? (
            <div>The list is empty!</div>
          ) : (
            <>
              {movies.map(movie => (
                <Col key={movie._id} className='mb-5' md={3}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
                  />
                </Col>
              ))}
              <Button
                className='btn-danger'
                onClick={() => { setUser(null); setToken(null); localStorage.clear() }}>
                  Logout
              </Button>
            </>
          )
          } */}
        </Routes>
      </Row>
    </BrowserRouter>
  )
}