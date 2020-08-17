import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = { isToggleOn: true }
        this.handleClick = this.handleClick.bind(this)
        this.ListItem = this.ListItem.bind(this)
    }

    handleClick(){
        this.setState(state => ({
            isToggleOn: !this.state.isToggleOn
        }))
    }
    render() { 
        return ( 
            <div>
              <button onClick={this.handleClick}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
              </button>
              {/* <NumberList numbers = {numbers} /> */}
            </div>
           
         );
    }
   
   
}

// function ListItem(props){
//     return <li>{props.value}</li>
// }
// function NumberList(props){
//     const numbers = props.numbers
//     const listitems = numbers.map(number => {
//         <ListItem key={number.toString()}   value={number}/>
//     })
//     return (
//         <ul>
//             {listitems}
//         </ul>
//     )
// }
// const numbers = [1,2,3,4,5,6]
 
export default Button;