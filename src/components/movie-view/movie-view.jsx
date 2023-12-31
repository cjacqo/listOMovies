import './movie-view.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export const MovieView = ({ movies, favMovies, onAddToFavorites, onRemoveFromFavorites }) => {
  const { movieId } = useParams()
  const [genre, setGenre] = useState(null)
  const [directors, setDirectors] = useState([])
  const [isFav, setIsFav] = useState(favMovies?.includes(movieId) || false)

  const movie = movies.find(m => m._id === movieId)

  useEffect(() => {
    fetch('https://list-o-movies-311c22237892.herokuapp.com/genres')
      .then(res => res.json())
      .then(data => {
        const foundGenre = data.find(g => g._id === movie.Genre)
        setGenre(foundGenre.Name)
      })
    fetch('https://list-o-movies-311c22237892.herokuapp.com/directors')
      .then(res => res.json())
      .then(data => {
        let foundDirectors = []
        movie.Directors.forEach(director => {
          foundDirectors.push(data.find(d => d._id === director))
        })
        setDirectors(foundDirectors)
      })
  }, [movie])

  const handleFavoriteClick = () => {
    setIsFav(!isFav)
    if (isFav) onRemoveFromFavorites(movieId)
    else onAddToFavorites(movieId)
  }

  const directorTitle = movie.Directors.length > 1 ? 'Directors' : 'Director'

  return (
    <Card className='h-100 w-100'>
      <Container className='m-0 p-0'>
        <Row className='g-0' xs={1} sm={1} md={2}>
          <Col>
            <img className='img-fluid' src={movie.ImagePath} alt={movie.Title} />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <p className='card-text'><strong>Description:</strong>{movie.Description}</p>
              <p>Genre: {genre}</p>
              <p>{directorTitle}: {directors.map((director, i) => <span key={i}>{director.Name}&nbsp;</span>)}</p>
              <Button onClick={() => handleFavoriteClick()}>{!isFav ? 'Add to favorites' : 'Remove from favorites'}</Button>

              <Link to={`/`}>
                <Button className='btn-dark'>
                  Back
                </Button>
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    </Card>
  )
}

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  favMovies: PropTypes.array.isRequired,
  onAddToFavorites: PropTypes.func.isRequired,
  onRemoveFromFavorites: PropTypes.func.isRequired
}