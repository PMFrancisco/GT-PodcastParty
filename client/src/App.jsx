import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PodcastList from './pages/podcastList'
import HomePage from './pages/homePage'
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>  
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/episodes" element={<PodcastList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
