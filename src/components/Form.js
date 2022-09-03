import React, {useState} from "react";


export default function Form (props) {
    const [name, setName] = useState('');

    function handleSubmit (e) {
        e.preventDefault();
        if (name.trim() === '') {
            return null;
        } else {
        props.addTask(name);   
        setName(''); 
        }
    }

    function handleChange (e) {
        setName(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
        <input
          type='text'
          id='new-todo-input'
          className='input input__lg'
          name='text'
          autoComplete='off'
          value={name}
          onChange={handleChange}/>
      </form>
    )
}