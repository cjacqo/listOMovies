import { useEffect, useState } from 'react'
import { MovieView } from '../movie-view/movie-view'
import { MovieCard } from '../movie-card/movie-card'

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Stand by Me',
      description: 'Four friends set out on a journey to find a dead body in the woods. Along the way, they confront their fears and learn about themselves and each other.',
      genre: 'Drama',
      director: 'Rob Reiner',
      image: 'https://m.media-amazon.com/images/I/81PmlArGyfS._AC_UF894,1000_QL80_.jpg'
    },
    {
      id: 2,
      title: 'Pulp Fiction',
      description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      genre: 'Crime',
      director: 'Quentin Tarantino',
      image: 'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg'
    },
    {
      id: 3,
      title: 'Being John Malkovich',
      description: 'A puppeteer discovers a portal that leads into the mind of actor John Malkovich. As he explores Malkovich\'s mind, he and others become obsessed with the experience and its possibilities.',
      genre: 'Fantasy',
      director: 'Spike Jonze',
      image: 'https://m.media-amazon.com/images/M/MV5BMTFlYjgyMjUtNmJhZS00MDY2LTg0ZmMtNTVlNDA2NTUwYTRjXkEyXkFqcGdeQXVyMTUzMDUzNTI3._V1_.jpg'
    }
  ])

  const [selectedMovie, setSelectedMovie] = useState(null)

  if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />

  if (movies.length === 0) return <div>The list is empty!</div>

  return (
    <div>
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => setSelectedMovie(newSelectedMovie)}
        />
      ))}
    </div>
  )
}