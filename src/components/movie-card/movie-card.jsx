import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const MovieCard = ({ movie, fav }) => {
  const [isFav, setIsFav] = useState(fav)

  useEffect(() => {
    setIsFav(fav)
  }, [fav])
  
  return (
    <Card className='h-100 pointer movie-card text-bg-warning'>
      <Card.Img
        className='h-100'
        variant='top'
        src={movie.ImagePath}
        alt={movie.Title} />
      <Card.Body className="card-body">
        <Card.Title className='movie-title'>{movie.Title}</Card.Title>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant='link'>Open</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  fav: PropTypes.bool.isRequired
}