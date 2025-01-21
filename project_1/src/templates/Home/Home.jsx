import { Component } from 'react'
import './style.css'
import { PostCard } from '../../components/PostcCard'
import { Post } from '../../components/Post'
import loadPosts from '../../utils/load_posts'


class Home extends Component {
  state = {
    posts : []
  }

  async componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(posts => this.setState({posts}))
    await this.loadPosts()
  }

  loadPosts = async () => {
    const postAndPhotos = await loadPosts()
    this.setState({posts: postAndPhotos})
  }

  render() {
    const {posts} = this.state
    return (
      <>
      <section className='container'>
      <div className='posts'>
          {posts.map(post => (
            <PostCard 
              key={post.id}
              title={post.title}
              body={post.body}
            />
          ))}
        </div>
      </section>
      </>
    )
  }
}

export default Home
