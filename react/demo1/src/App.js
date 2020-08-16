import React,{Component,Fragment} from 'react'

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputValue: 'louis',
            list: []
        }
    }

    render(){
        return (
           <Fragment>
            Hello World
            <input value={this.state.inputValue} onChange={this.inputChange.bind(this)}/>
            <button>增加服务</button>
            <ul>
                <li>头部按摩</li>
            </ul>
            </Fragment>
            
        )
            
        
    }

    inputChange(e){
        console.log(e.target.value)
        this.setState({
            inputValue: e.target.value
        })
    }

}

    
export default App