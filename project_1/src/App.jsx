import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


class App extends Component {
  state = {
    posts : [
      {
        id: 1,
        title: 'titulo 1',
        body: 'body 1',
      },
      {
        id: 2,
        title: 'titulo 2',
        body: 'body 2',
      },
      {
        id: 3,
        title: 'titulo 3',
        body: 'body 3',
      },
    ]
  }

  

  render() {
    const {posts} = this.state
    return (
      <>
        <div>
          {posts.map(post => <h1 key={post.id}>{post.title}</h1>)}
        </div>
      </>
    )
  }
}

{/* // function App() { */}
{/* //   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// } */}

export default App
