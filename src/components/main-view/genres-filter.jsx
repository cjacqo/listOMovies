import PropTypes from 'prop-types'
import React from 'react'
import { Form } from 'react-bootstrap'

export const GenresFilter = ({ genres, handleGenreChange }) => {
  console.log(genres)
  return (
    <div style={{ marginBottom: '2rem' }}>
      <Form>
        <Form.Select mb='3' onChange={handleGenreChange}>
          <option value='All'>All</option>
          {
            genres.map(genre => (
              <option
                key={genre._id}
                value={genre._id}>
                  {genre.Name}
              </option>
            ))
          }
        </Form.Select>
      </Form>
    </div>
  )
}

GenresFilter.propTypes = {
  genres: PropTypes.array.isRequired,
  handleGenreChange: PropTypes.func.isRequired
}