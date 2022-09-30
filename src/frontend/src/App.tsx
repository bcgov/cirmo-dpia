import { useState } from 'react'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import reactLogo from './assets/react.svg'
import './sass/App.scss'
import './sass/common.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 >Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default App
