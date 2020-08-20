import React, {useState, useEffect, createContext, useContext} from 'react';

const CountContext = createContext()
function Count(){
    let count = useContext(CountContext)
    return (<h2>{count}</h2>)
}

function App(){
    const [times, btnClick] = useState(0)
    useEffect(() => {
        console.log(`你点击的次数${times}`);
        return () => {
        console.log(`清除点击次数${times}`);
        }
    },[times])
    return (
        <div>
            <p>You clicked {times} Times</p>
            <button style={{margin:5}} onClick={() => {btnClick(times+1)}}>Chilk me</button>
            <CountContext.Provider value={times}>
                <Count></Count>
            </CountContext.Provider>
        </div>
    )
}

export default App