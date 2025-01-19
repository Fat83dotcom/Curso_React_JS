import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


class App extends Component {
  constructor(props) {
    super(props)
    // this.handleSumButton = this.handleSumButton.bind(this)
    this.state = {
      name: 'Fernando Mendes',
      counter: 0,
    }
  }

  handleSumButton = () => {
    const {counter} = this.state
    this.setState({counter: counter + 1})
  }

  handleResetButton = (event) => {
    event.preventDefault()
    this.setState({counter: 0})
  }

  SumButton = () => {
    return (
      <button onClick={this.handleSumButton} className='button-sum'>Adicionar</button>
    )
  };

  render() {
    const {name, counter} = this.state // Atribuição via desestruturação
    
    return (
      <>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <h1>Olá Mundo !!!</h1>
          <div>
            <this.SumButton/>
          </div>
          <h2>{counter}</h2>
          <h2>{name}</h2>
          <a onClick={this.handleResetButton} href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
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
