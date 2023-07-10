export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <img src={movie.image} alt={movie.title} />
      <div>
        <p>Title: {movie.title}</p>
        <p>Description: {movie.description}</p>
        <p>Genre: {movie.genre}</p>
        <p>Director: {movie.director}</p>
      </div>
      <div>
        <button onClick={onBackClick}>Back</button>
      </div>
    </div>
  )
}