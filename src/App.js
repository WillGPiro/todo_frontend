import React from 'react';
import TodoApp from './TodoApp.js';
import TodoAppLogin from './TodoAppLogin';
import './App.css';
import { 
    BrowserRouter, 
    Route, 
    Redirect,
    Switch,
 } from 'react-router-dom';


const isLoggedIn = () => JSON.parse(localStorage.getItem('user'));

export default class App extends React.Component {
    render() {
        return (
        <div className="App">
            <header>
                Your Helpful Reminder List
            </header>
            <BrowserRouter>
                <Route path='/' render={() => 
                isLoggedIn() 
                    ? <TodoApp />
                    : <Redirect to='login' />
                }/>
                 <Route path='/login' component={TodoAppLogin} />
            </BrowserRouter>
        </div>
    );
    }
}