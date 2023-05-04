import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as scale from './scale/scale'
import * as guitar from './guitar/guitar'

function App() {
  const [count, setCount] = useState(0)
  const string1 = guitar.generateString(6, 13)
  const scale1 = scale.genScale(6, 2)
  const string1vis = guitar.getNotesInScale(string1, scale1)
  console.log('ds', scale.SCALE_LETTERS_SHARP)
  const string1display = string1.map((note, index) => {
    if (string1vis[index]) {
      return scale.getLet(note, true)
    } else {
      return ''
    }
  })

  console.log(string1display)
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
