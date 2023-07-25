import PropTypes from 'prop-types'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const MovieCard = ({ movie }) => {
  return (
    <Card className='h-100 pointer movie-card text-bg-warning'>
      <Card.Img
        className='card-img-top h-100'
        src={movie.ImagePath}
        alt={movie.Title} />
      <Card.Body className="card-body">
        <Card.Title className='movie-title'>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant='link'>Open</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired
}