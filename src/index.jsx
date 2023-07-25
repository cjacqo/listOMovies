import { createRoot } from "react-dom/client"

import { MainView } from "./components/main-view/main-view"

import Container from 'react-bootstrap/Container'
import './index.scss'

// Main component
const App = () => {
  return (
    <Container className="d- my-5 container-xl justify-content-center align-items-center">
      <MainView />
    </Container>
  )
}

// Finds the root of your app
const container = document.querySelector('#root')
const root = createRoot(container)

// Tells React to render your app in the root DOM element
root.render(<App />)