import { useEffect, useState } from 'react'
import { LoginView } from '../login-view/login-view'
import { MovieView } from '../movie-view/movie-view'
import { MovieCard } from '../movie-card/movie-card'
import { SignupView } from '../signup-view/signup-view'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const storedToken = localStorage.getItem('token')
  const [user, setUser] = useState(storedUser ? storedUser : null)
  const [token, setToken] = useState(storedToken ? storedToken : null)
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)

  useEffect(() => {
    if (!token) return

    fetch('https://list-o-movies-311c22237892.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [token])

  return (
    <BrowserRouter>
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
                    <MovieView movies={movies} />
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
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
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