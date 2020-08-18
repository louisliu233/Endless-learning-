import React,{Component,Fragment} from 'react'
import Test from './test'
import Button from './Button'
import store from './store'
import './style.css'

class App extends Component{
    constructor(props){
        super(props)
        this.state = store.getState()
    }

    render(){
        return (
           <Fragment>
            {/* Hello World */}
            <label htmlFor='louis'>添加内容:</label>
            
            <input id='louis' className='input' 
            value={this.state.inputValue} 
            onChange={this.inputChange.bind(this)}
            ref = {input => this.input = input}/>

            <button onClick={this.addList.bind(this)}>增加服务</button>
            <ul ref = {ul => this.ul = ul}>
               {
                   this.state.list.map((item,index) => {
                       return ( 
                        <Test 
                        key={index+item}
                        content={item}
                        index={index}
                        delList={this.delList.bind(this)}/>
                       )                    
                   })
               }
            </ul>
            <Button />
            </Fragment>
            
        )
            
        
    }

    inputChange(){
        this.setState({
            inputValue: this.input.value
            
        })
    }
    addList(){
        this.setState({
            list:[...this.state.list,this.state.inputValue],
            inputValue:''
        },() => {
            console.log(this.ul.querySelectorAll('li').length);
        })
       
    }
    delList(index){
        let list = this.state.list
        list.splice(index,1)
        this.setState({
            list:list
        })
    }

}


export default App