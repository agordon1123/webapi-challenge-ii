import React, { useState, useEffect } from 'react';
import '../App.css';
import Axios from 'axios';
import Post from './Post';
import { Route, Link } from 'react-router-dom';


const App = () => {
  const [posts, setPosts] = useState([]);
  const [updating, setUpdating] = useState(false);
  console.log(posts);

  const getPosts = () => {
    Axios.get('http://localhost:8000/api/posts')
      .then(res => {
        console.log('res: ', res)
        setPosts(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  };
  
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2>Hello Alex</h2>
      <p>Welcome to MyPlace</p>

      {posts.length && posts.map(post => <Post post={post} />)}

      {/* <Route path='' render={props => <Post {...props} posts={posts} />} /> */}
    </div>
  );
}

export default App;
