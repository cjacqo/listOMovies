import { createRoot } from "react-dom/client"

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss'

// Main component
const ListOMoviesApplication = () => {
  return (
    <div className="list-o-movies">
      <div>Good morning</div>
    </div>
  )
}

// Finds the root of your app
const container = document.querySelector('#root')
const root = createRoot(container)

// Tells React to render your app in the root DOM element
root.render(<ListOMoviesApplication />)