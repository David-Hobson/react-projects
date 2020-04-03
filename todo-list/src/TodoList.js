import React, { Component } from 'react'
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "./TodoList.css";

class TodoList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todos: []
        };

        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
    }

    addTodo(newTask) {
        this.setState(state => ({
            todos: [...state.todos, newTask]
        }));
    }

    removeTodo(id) {
        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        }));
    }

    updateTodo(id, updatedTask) {
        const updatedTodos = this.state.todos.map(todo => {
            if(todo.id === id) {
                return {...todo, task: updatedTask};
            }

            return todo;
        });

        this.setState({todos: updatedTodos});
    }

    toggleCompletion(id) {
        const completedTodos = this.state.todos.map(todo => {
            if(todo.id === id) {
                return {...todo, completed: !todo.completed};
            }

            return todo;
        });

        this.setState({todos: completedTodos});
    }

    renderTodos() {
        return this.state.todos.map((todo, idx) => {
            return <Todo key={todo.id} task={todo.task} id={todo.id} completed={todo.completed} removeTodo={this.removeTodo} updateTodo={this.updateTodo} toggleCompletion={this.toggleCompletion}/>
        });
    }

    render() {
        return (
            <div className="TodoList">
                <h1>
                    Todo List! <span>A Simple React Todo List App</span>
                </h1>
                <ul>
                    {this.renderTodos()}
                </ul>
                <NewTodoForm addTodo={this.addTodo}/>
            </div>
        );
    }
}

export default TodoList;