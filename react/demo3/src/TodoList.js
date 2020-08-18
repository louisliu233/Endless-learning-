import React, { Component } from 'react'
import store from './store'

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
    }
    render() { 
        return ( 
        <div>
            <div>
                <input value={this.state.inputValue}/>
                <button style={{marginLeft:5}}>提交</button>
                <ul>
                    <li>louis </li>
                </ul>
            </div>
        </div>
         );
    }
}
 
export default TodoList;