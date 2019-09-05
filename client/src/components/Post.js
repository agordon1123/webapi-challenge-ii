import React from 'react';

const Post = props => {
    console.log(props)
    return (
        <div className='post'>
            <p>{props.post.title}</p>
            <p>{props.post.contents}</p>
            <p>ID: {props.post.id}</p>
        </div>
    )
}

export default Post;
