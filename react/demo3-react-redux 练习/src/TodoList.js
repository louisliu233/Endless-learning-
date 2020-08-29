import React from 'react';
import { connect } from 'react-redux'

 const TodoList = (props) => {
     let {inputValue, changeList, addList, delClick, list} = props
    return ( 
        <div>
            <input  value={inputValue}
            onChange={changeList}/>
            <button onClick={addList}
            style={{marginLeft:5}}>添加</button>
            <ul>
               {
                   list.map((item,index) => {
                   return (
                       <li key={index} onClick={() => {delClick(index)}}>{item}</li>
                   )
                   })
               }
            </ul>
        </div>
     );
}

 
const stateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        list: state.list
    }
}

const dispatchToProps = (dispatch) => {
    return {
        changeList(e){
            let action = {
                type: 'changeList',
                value: e.target.value
            }
            dispatch(action)
        },

        addList(){
            let action = {
                type: 'addList'        
            }
            dispatch(action)
        },
        delClick(index){
            let action = {
                type: 'delList',
                index
            }
            dispatch(action)
        }
    }
}

export default connect(stateToProps,dispatchToProps)(TodoList);