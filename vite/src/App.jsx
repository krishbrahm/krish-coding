import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import MyComponent from './MyComponent'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MyComponent mood="happy" energy="high" />
      <MyComponent mood="sad" energy="low" />
      <MyComponent mood="excited" energy="super high" />
    </div>
  )
}

export default App
