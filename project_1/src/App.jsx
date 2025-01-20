import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


class App extends Component {
  state = {
    posts : []
  }

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(posts => this.setState({posts}))
    this.loadPosts()
  }

  loadPosts = async () => {
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photoResponse = fetch('https://jsonplaceholder.typicode.com/photos')
    const [posts, photo] = await Promise.all([postResponse, photoResponse])
    const postJson = await posts.json()
    const photoJson = await photo.json()

    const postAndPhotos = postJson.map((post, index) => {
      return {... post, cover: photoJson[index].url}
    })

    this.setState({posts: postAndPhotos})
  }

  render() {
    const {posts} = this.state
    return (
      <>
      <section className='container'>
        <div className='posts'>
          {posts.map(post => (
            <div className='post'>
            <img className='photo' src={post.cover} alt="foto" />
              <div key={post.id}>
                <h1>{post.title}</h1>
                <h2>{post.body}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>
      </>
    )
  }
}

export default App
