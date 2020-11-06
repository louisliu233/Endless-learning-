import React, { useState } from 'react';
import { Table, Tag, Space, Popconfirm, Button, Pagination } from 'antd';
import { connect } from 'umi';
import UserModal from './components/UserModal'



const index = ({ users, dispatch, userListLoading }: any) => {
  const [modalVisible, setModalVisible] = useState(false);  
  const [record, setRecord] = useState<any>(undefined);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Create Time',
      dataIndex: 'create_time',
      key: 'create_time',
    },

    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <span >
          <a onClick={() => {visibleHandler(record)}}>Edit</a>&nbsp;&nbsp;&nbsp;
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => {deleteUser(record)}}
            okText="Yes"
            cancelText="No"
          >
          <a href="#">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const visibleHandler = (record: any) => {
    setModalVisible(true);
    setRecord(record);
  }

  const deleteUser = (record: any) => {
    const id = record.id;
    dispatch({ 
      type: 'users/delete',
      payload: {
        id
      }
    })
  }

  const addUser = () => {
    setModalVisible(true);
    setRecord(undefined);
  }


  const closeHandler = () => {
    setModalVisible(false);
  }

  const onFinish = (values: any) => {
    let id = 0;
    if(record){
      id = record.id
    }
    if(id){
      dispatch({
        type: 'users/edit',
        payload: {
          values,
          id
        }
      })
    }else {
      dispatch({
        type: 'users/add',
        payload: {
          values,
        }
      })
    }
    setModalVisible(false);
  }


  return (
    <div className="list-table">
      <Button type='primary' onClick={addUser}>Add</Button>
      <Table 
      columns={columns} 
      dataSource={users.data} 
      rowKey='id' 
      loading={userListLoading} 
      pagination={false}/>
      <Pagination
      className='pagiNation'
      total={85}
      showSizeChanger
      showQuickJumper
      showTotal={total => `Total ${total} items`}
    />
      <UserModal
      visible={modalVisible}
      closeHandler={closeHandler}
      record={record}
      onFinish={onFinish}
      ></UserModal>
      
    </div>
  );
};

const mapStateToProps = ({users, loading}: any) => {
  return {
    users,
    userListLoading: loading.models.users
};
}

export default connect(mapStateToProps)(index);
