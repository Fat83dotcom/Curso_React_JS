import { PostCard } from "../PostcCard"
import './style.css'

export const Post = (props) => {
  <div className='posts'>
    {props.map(post => (
      <PostCard 
        key={post.id}
        title={post.title}
        body={post.body}
      />
    ))}
  </div>
}