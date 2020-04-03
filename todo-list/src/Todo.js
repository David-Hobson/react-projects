import React, { Component } from 'react'
import "./Todo.css"

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false,
            task: this.props.task
        }

        this.handleRemove = this.handleRemove.bind(this);
        this.handleEditToggle = this.handleEditToggle.bind(this);
        this.handleComplete = this.handleComplete.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleRemove(evt){
        this.props.removeTodo(this.props.id);
    }

    handleComplete(evt) {
        this.props.toggleCompletion(this.props.id);
    }

    handleEditToggle(evt) {
        this.setState(state => ({
            isEditing: !state.isEditing
        }));
    }

    handleUpdate(evt) {
        evt.preventDefault();
        this.props.updateTodo(this.props.id, this.state.task);
        this.setState({ isEditing: false });
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    render() {

        let result;

        if(this.state.isEditing) {
            result = (
                <div className="Todo">
                    <form className="Todo-edit-form" onSubmit={this.handleUpdate}>
                        <input type="text" value={this.state.task} name="task" onChange={this.handleChange}/>
                        <button>Save</button>
                    </form>
                </div>
            );
        } else {
            result = (
                <div className="Todo">
                    <li onClick={this.handleComplete} className={this.props.completed ? "Todo-task completed" : "Todo-task"}>{this.props.task}</li>
                    <div className="Todo-buttons"> 
                        <button onClick={this.handleEditToggle}><i className="fas fa-pen"></i></button>
                        <button onClick={this.handleRemove}><i className="fas fa-trash"></i></button>
                    </div>
                </div>
            );
        }

        return result;

    }
}

export default Todo;