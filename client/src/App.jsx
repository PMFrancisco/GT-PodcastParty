import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PodcastList from './pages/podcastList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PodcastList></PodcastList>
    </>
  )
}

export default App
