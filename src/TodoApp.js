import React, { Component } from 'react'
import AddTodo from './AddTodo.js';
import request from 'superagent';

export default class TodoApp extends Component {
    //set state as an empty array
    state = { todos: [] }

//pull todos from the database
    componentDidMount = async() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const todos = await request.get(`https://obscure-depths-56278.herokuapp.com/api/todos`)
            .set('Authorization', user.token);

        
        this.setState({ todos: todos.body })
    }

    //creating post rendering
    handleClick = async () => {
        const newTodo = {
            
            id: Math.random(),
            task: this.state.todoInput,
            complete: false,
        };

        const user = JSON.parse(localStorage.getItem('user'));


        const newTodos = [...this.state.todos, newTodo];

        this.setState({ todos: newTodos });
        const data = await request.post(`https://obscure-depths-56278.herokuapp.com/api/todos`, {
            task: this.state.todoInput
        })
            .set('Authorization', user.token);
    }

    handleInput = (e) => { this.setState({ todoInput: e.target.value })};
    
    render() {
        if (localStorage.getItem('user')) {
        return (
            <div>
                <h3>Hello {JSON.parse(localStorage.getItem('user')).email}</h3>
                <AddTodo 
                todoInput={ this.state.todoInput } 
                handleClick={ this.handleClick } 
                handleInput={ this.handleInput } 
            />
                {
                    this.state.todos.map((todo, index) => <p 
                        style={{
                            textDecoration: todo.complete ? 'line-through' : 'none'
                        }}
                        onClick={async () => {
                            // Make a copy of the array in state.
                        const newTodos = this.state.todos.slice();
                            // Find the referenced todo
                        const matchingTodo = newTodos.find((thisTodo) => todo.id === thisTodo.id);

                        matchingTodo.complete = !todo.complete
                        const user = JSON.parse(localStorage.getItem('user'));
                        
                        this.setState({ todos: newTodos });
                        const data = await request.put(`https://obscure-depths-56278.herokuapp.com/api/todos/${todo.id}`, matchingTodo)
                        .set('Authorization', user.token);
                    }} key={todo.id}>
                        {todo.task}

                        <button className="delete" onClick={async () => {
                                const user = JSON.parse(localStorage.getItem('user'));

                                await request.delete(`https://obscure-depths-56278.herokuapp.com/api/todos/${todo.id}`).set('Authorization', user.token);

                                const deletedTodos = this.state.todos.slice();
                                deletedTodos.splice(index, 1);

                                this.setState({ todos: deletedTodos });

                            }}>
                                <span>Delete</span> </button>

                    </p>)
                }
            </div>
        )
            }
    }
}