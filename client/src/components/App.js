import React from 'react';
import '../App.css';
import Axios from 'axios';

const getPosts = () => {
  Axios.get('http://localhost:8000/api/posts')
    .then(res => {
      console.log('res: ', res)
    })
    .catch(err => {
      console.log(err)
    })
}

function App() {
  return (
    <div className="App">
      <h1>Hello from App</h1>
      <button onClick={getPosts}>GET</button>
    </div>
  );
}

export default App;
