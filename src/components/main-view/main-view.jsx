import { useEffect, useState } from 'react'
import { LoginView } from '../login-view/login-view'
import { MovieView } from '../movie-view/movie-view'
import { MovieCard } from '../movie-card/movie-card'
import { SignupView } from '../signup-view/signup-view'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

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
    <Row>
      {!user ? (
        <>
          <Col>
            <LoginView onLoggedIn={(user, token) => {
              setUser(user)
              setToken(token)
            }} />
          </Col>
          <Col>
            Or
          </Col>
          <Col>
            <SignupView />
          </Col>
        </>
      ) : selectedMovie ? (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <div>
          {movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
            />
          ))}
          <button onClick={() => { setUser(null); setToken(null); localStorage.clear() }}>Logout</button>
        </div>
      )
      }
    </Row>
  )
}