import React, { useReducer , useContext, createContext} from 'react'


const CountContext = createContext()

function App(){
    const state = 0
    const [ count, dispatch ] = useReducer( reducer, state)
    return(
        <div>
            <p>现在的分数是：{count}</p>
            <button onClick={() => {dispatch('add')}}>Increment</button>
            <button onClick={() => {dispatch('sub')}}>Decrement</button>
            <button onClick={() => {dispatch('reset')}}>归零</button>
            <CountContext.Provider value={count}>
                <Count></Count>
            </CountContext.Provider>
        </div>
    )
}
function reducer(state, action){
    switch(action){
        case 'add': 
            return state + 1
        case 'sub':
            return state - 1
        case 'reset':
            return state = 0
        default :
            return state
    }
}

function Count(){
    const count = useContext(CountContext)
    return (<p>{count}</p>)
}


export default App