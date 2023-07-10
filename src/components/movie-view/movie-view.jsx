import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

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

  console.log(directors)
  
  const directorTitle = movie.Directors.length > 1 ? 'Directors' : 'Director'
  return (
    <div>
      <img src={movie.ImagePath} alt={movie.Title} />
      <div>
        <p>Title: {movie.Title}</p>
        <p>Description: {movie.Description}</p>
        <p>Genre: {genre}</p>
        <p>{directorTitle}: {directors.map((director, i) => <span key={i}>{director.Name}&nbsp;</span>)}</p>
      </div>
      <div>
        <button onClick={onBackClick}>Back</button>
      </div>
    </div>
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