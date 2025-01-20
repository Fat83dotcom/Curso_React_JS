export const PostCard = (props) => {
    const post = props
    console.log(props)
    
    return (
        <div className='post'>
            <img className='photo' src={post.cover} alt="foto" />
            <div key={post.id}>
                <h1>{post.title}</h1>
                <h2>{post.body}</h2>
            </div>
        </div>
    )
}