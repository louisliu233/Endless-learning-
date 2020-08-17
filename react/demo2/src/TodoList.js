import React, { Component } from 'react';
import { Input, Button, List} from 'antd'
import store from './store'
import 'antd/dist/antd.css'


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = store.getState()  
    }
    render() { 
        return ( 
        <div style={{margin:'10px'}}>
            <div>
                <Input placeholder = {this.state.inputValue} 
                       style={{ width:'250px',marginRight:'3px'}}
                       />
                       <Button type='primary'>添加</Button>
            </div>
            <div style={{margin:10,width:300}}>
                <List
                    bordered
                    dataSource={this.state.list}
                    renderItem={item => (<List.Item>{item}</List.Item>)}
                    />
            </div>
        </div> 
        );
    }
}
 
export default TodoList;