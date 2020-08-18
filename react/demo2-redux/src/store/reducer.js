import {CHANG_INPUT, ADDLIST, DELLIST, GETLIST} from './actionTypes'


const defaultState ={
    inputValue: 'louisvillain',
    list: []
}
export default (state = defaultState,action) => {

    if(action.type === CHANG_INPUT){
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }

    if(action.type === ADDLIST){
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        newState.inputValue = ''
        return newState
    }

    if(action.type === DELLIST){
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index,1)
        return newState
    }

    if(action.type === GETLIST){
        let newState = JSON.parse(JSON.stringify(state))
        newState.list = action.data.data.list
        return newState
    }

    return state
}