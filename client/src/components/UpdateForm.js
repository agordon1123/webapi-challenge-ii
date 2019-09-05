import React, { useState } from 'react';

const UpdateForm = () => {
    const [state, setState] = useState({
        id: '',
        title: '',
        contents: ''
    })
    console.log(state);

    const handleChanges = e => {
        setState(...state, {
            [e.target.name]: e.target.value,
            [e.target.name]: e.target.value,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div>
            <p>Hello from UpdateForm.js</p>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChanges} placeholder='id' name='id' type='text' />
                <input onChange={handleChanges} placeholder='name' name='title' type='text' />
                <input onChange={handleChanges} placeholder='contents' name='contents' type='text' />
            </form>
        </div>
    )
}

export default UpdateForm;
