import './style.css'

export const PostCard = (props) => {
    const post = props    
    return (
        <div className='post'>
            <div>
                <h2>{post.title}</h2>
                <h3>{post.body}</h3>
            </div>
        </div>
    )
}