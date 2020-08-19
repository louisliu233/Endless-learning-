const defaultState = {
    inputValue: 'louisvillain',
    list: ['loiuisd','zimin','yufan']
}


export default (state = defaultState,action) => {

    if(action.type === 'changeList'){
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value
        return newState
    }

    if(action.type === 'addList'){
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.push(newState.inputValue)
        newState.inputValue= ''
        return newState
    }
    if(action.type === 'delList'){
        let newState = JSON.parse(JSON.stringify(state))
        newState.list.splice(action.index, 1)
        return newState
    }
    return state
}