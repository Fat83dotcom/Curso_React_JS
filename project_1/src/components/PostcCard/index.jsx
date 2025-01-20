export const PostCard = (props) => {
    const post = props    
    return (
        <div className='post'>
            <div>
                <h1>{post.title}</h1>
                <h2>{post.body}</h2>
            </div>
        </div>
    )
}