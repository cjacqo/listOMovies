export const MovieView = ({ movie, onBackClick }) => {
  const directorTitle = movie.Directors.length > 1 ? 'Directors' : 'Director'
  return (
    <div>
      <img src={movie.ImagePath} alt={movie.Title} />
      <div>
        <p>Title: {movie.Title}</p>
        <p>Description: {movie.Description}</p>
        <p>Genre: {movie.Genre}</p>
        <p>{directorTitle}: {movie.Directors.map((director, i) => <span key={i}>{director}&nbsp;</span>)}</p>
      </div>
      <div>
        <button onClick={onBackClick}>Back</button>
      </div>
    </div>
  )
}