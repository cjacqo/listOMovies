import { useEffect, useState } from 'react'
import { LoginView } from '../login-view/login-view'
import { MovieView } from '../movie-view/movie-view'
import { MovieCard } from '../movie-card/movie-card'

export const MainView = () => {
  const [user, setUser] = useState(null)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch('https://list-o-movies-311c22237892.herokuapp.com/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
  }, [])

  const [selectedMovie, setSelectedMovie] = useState(null)

  if (!user) return <LoginView />

  if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />

  if (movies.length === 0) return <div>The list is empty!</div>

  return (
    <div>
      {movies.map(movie => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
        />
      ))}
    </div>
  )
}