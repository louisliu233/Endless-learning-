import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            list:[
                {cid:123,title:'louis的个人博客1'},
                {cid:456,title:'louis的个人博客2'},
                {cid:789,title:'louis的个人博客3'},
            ]
         }
         //函数编程重定向
         this.props.history.replace('/home')
    }
    render() { 
        return ( 
            <div>
                {/* 标签重定向 */}
                {/* <Redirect to='./home' /> */}
                 <h2>LOUISVILLAIN</h2> 
                 <ul>
                     {
                         this.state.list.map((item,index) => {
                             return (
                                 <li key={index}>
                                     <Link to={'/list/'+item.cid}>
                                         {item.title}</Link></li>
                             )
                         })
                     }
                 </ul>
            </div>      
        );
    }
}
 
export default Index;