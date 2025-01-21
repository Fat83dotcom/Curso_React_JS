import { PostCard } from "../PostcCard"

export const Post = (props) => {
    const posts = props
    console.log(posts);
    
    return (
        <div className='posts'>
          {posts.map(post => (
            <PostCard 
              key={post.id}
              title={post.title}
              body={post.body}
            />
          ))}
        </div>
    )
}