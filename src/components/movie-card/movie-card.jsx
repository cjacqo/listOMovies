import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className='h-100 pointer movie-card text-bg-warning'
      onClick={() => onMovieClick(movie)}>
      <img
        className='card-img-top h-100'
        src={movie.ImagePath}
        alt={movie.Title} />
      <div className="card-body">
        <h5 className='movie-title'>{movie.Title}</h5>
      </div>
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
}