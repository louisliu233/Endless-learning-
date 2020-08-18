import React, { Component } from 'react';
import store from './store'
import {changInputAction, addListAction, delListAction, getTodoList, getMyList} from './store/actionCreators'
import TodolistUI from './TodolistUI';



class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()  
        this.changeInputValue = this.changeInputValue.bind(this)
        this.storeChange = this.storeChange.bind(this)
        this.clickBtn = this.clickBtn.bind(this)
        this.delClick = this.delClick.bind(this)
        store.subscribe(this.storeChange)
      
    }
    componentDidMount(){
            // const action = getTodoList()
            // store.dispatch(action)
            const action = getMyList()
            store.dispatch(action)
        }
    
    render() { 
        return ( 
            <TodolistUI 
            inputValue = {this.state.inputValue}
            changeInputValue = {this.changeInputValue}
            clickBtn = {this.clickBtn}
            list = {this.state.list}
            delClick = {this.delClick}
            />
        );
    }
    changeInputValue(e){
        const action = changInputAction(e.target.value)
        store.dispatch(action)
    }
    storeChange(){
        this.setState(store.getState())
    }
    clickBtn(){
        const action = addListAction()
        store.dispatch(action)
    }
    delClick(index){
        const action = delListAction(index)
        store.dispatch(action)
    }

}
 
export default TodoList;