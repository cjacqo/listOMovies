import './movie-view.scss'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export const MovieView = ({ movie, onBackClick }) => {
  const [genre, setGenre] = useState(null)
  const [directors, setDirectors] = useState([])

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

  const directorTitle = movie.Directors.length > 1 ? 'Directors' : 'Director'
  return (
    <Card className='h-100'>
      <Row className='g-0'>
        <Col className='col-md-4'>
          <img className='img-fluid' src={movie.ImagePath} alt={movie.Title} />
        </Col>
        <Col className='col-md-8'>
          <div className='card-body'>
            <h5>{movie.Title}</h5>
            <p className='card-text'>Description: {movie.Description}</p>
            <p>Genre: {genre}</p>
            <p>{directorTitle}: {directors.map((director, i) => <span key={i}>{director.Name}&nbsp;</span>)}</p>
            <Button
              className='btn-dark'
              onClick={onBackClick}>
                Back
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  )
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Directors: PropTypes.array.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
}