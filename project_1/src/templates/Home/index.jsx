import { Component } from 'react'
import './style.css'
import { PostCard } from '../../components/PostcCard'
import loadPosts from '../../utils/load_posts'
import { ButtonLoadMore } from '../../components/Button'
import { SearchInput } from '../../components/Input'


class Home extends Component {
  state = {
    posts : [],
    allPosts : [],
    page: 0,
    postsPerPage: 2,
    searchValue: '',
  }

  async componentDidMount() {
    await this.loadPosts()
  }

  loadPosts = async () => {
    const {page, postsPerPage} = this.state
    const postAndPhotos = await loadPosts()
    this.setState(
      {
        posts: postAndPhotos.slice(page, postsPerPage),
        allPosts: postAndPhotos
      }
    )
  }

  loadMorePost = () => {
    console.log('Clicado');
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({posts, page: nextPage})
  }

  handleChange = (value) => {
    console.log(value.target.value)
    this.setState({searchValue: value.target.value})
    console.log(this.state.searchValue);
  }

  render() {
    const {posts, page, postsPerPage, allPosts, searchValue} = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length
    const filterdPosts = searchValue ? posts.filter(post =>{
      return post.title.toLowerCase().includes(searchValue.toLowerCase())
    }) : posts
    return (
      <>
      <section className='container'>
        <SearchInput searchValue={searchValue} handleChange={this.handleChange}/>
        {
          filterdPosts.length > 0 ? (<div className='posts'>
          {filterdPosts.map(post => (
            <PostCard 
              key={post.id}
              title={post.title}
              body={post.body}
            />
          ))}
          </div>) : <p>Não há posts com essas palavras.</p>
        }
        {!searchValue && (<ButtonLoadMore 
        loadMore={this.loadMorePost}
        setDisable={noMorePosts}
        />)}
        
      </section>
      </>
    )
  }
}

export default Home