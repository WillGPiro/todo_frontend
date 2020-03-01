import React, { Component } from 'react'

export default class AddTodo extends Component {
    render() {
        return (
            <div>
                <input value={ this.props.todoInput } onChange={ this.props.handleInput} />
                <button onClick={this.props.handleClick}>Add todo</button>
            </div>
        )
    }
}