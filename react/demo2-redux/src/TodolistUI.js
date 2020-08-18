import React from 'react';
import { Input, Button, List} from 'antd'
import 'antd/dist/antd.css'

//函数组件 (无状态组件)
const TodolistUI = (props) => {
    return (  <div style={{margin:'10px'}}>
    <div>
        <Input placeholder = {props.inputValue} 
               style={{ width:'250px',marginRight:'3px'}}
               onChange={props.changeInputValue}
               value={props.inputValue}
               />
               <Button type='primary'
                    onClick={props.clickBtn}
               >添加</Button>
    </div>
    <div style={{margin:10,width:300}}>
        <List 
            bordered
            dataSource={props.list}
            renderItem={(item,index) => (<List.Item style={{position: 'relative'}}>{item}
            <button style={{position: 'absolute',right:10,top:10}}
            onClick={ () => {props.delClick(index)}}
            >删除</button> </List.Item>)}
            />
    </div>
</div>  );
}


//类组件
// class TodolistUI extends Component {
//     constructor(props) {
//         super(props);
//         state = {  }
//     }
//     render() { 
//         return (  <div style={{margin:'10px'}}>
//         <div>
//             <Input placeholder = {props.inputValue} 
//                    style={{ width:'250px',marginRight:'3px'}}
//                    onChange={props.changeInputValue}
//                    value={props.inputValue}
//                    />
//                    <Button type='primary'
//                         onClick={props.clickBtn}
//                    >添加</Button>
//         </div>
//         <div style={{margin:10,width:300}}>
//             <List 
//                 bordered
//                 dataSource={props.list}
//                 renderItem={(item,index) => (<List.Item style={{position: 'relative'}}>{item}
//                 <button style={{position: 'absolute',right:10,top:10}}
//                 onClick={ () => {props.delClick(index)}}
//                 >删除</button> </List.Item>)}
//                 />
//         </div>
//     </div>  );
//     }
// }
 
export default TodolistUI ;