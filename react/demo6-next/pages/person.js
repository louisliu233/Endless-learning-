import Link from 'next/link'
import {withRouter} from 'next/router'
import React, { useState, useEffect, useContext, createContext, useReducer } from 'react'

function Children(){
    const count = useContext(Countcontext)
    const [ state, dispatch] = useReducer((count, action) => {
        switch(action){
            case 'subBtn':
                return count - 1
            case 'reSet':
                return count = 0
            default :
                return count
        }
    },count)
    return (
        <>
        <h2>{count}***{state}</h2>
        <button onClick={() => {dispatch('subBtn')}}>减少</button>
        <button onClick={() => {dispatch('reSet')}}>清零</button>
        </>
    )
}

const Countcontext = createContext()

 function Person({router}){
    const [ count, addBtn] = useState(0)
    useEffect(() => {
        console.log(1);
        return () => {
        console.log(2);
        }
    },[])

    return (
        <>
        <h3>
        <Link href='/js'><a>Back to First Post</a></Link>
        </h3>
        <p>{router.query.name}</p>
        <p>{count}</p><button onClick={() => {addBtn(count + 1)}}>增加</button>
        <Countcontext.Provider value={count}>
            <Children/>
        </Countcontext.Provider>
        </>
    )
}

export default withRouter(Person)