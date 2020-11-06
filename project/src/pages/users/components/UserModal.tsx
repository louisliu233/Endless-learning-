import React, { useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';

const UserModal = (props: any) => {
  const {visible, closeHandler, record, onFinish } = props;
  const [form] = Form.useForm()
  useEffect(() => {
    if(record == undefined) {
      form.resetFields();
    }else {
      form.setFieldsValue(record);
    }
  }, [visible])

  const onOk = () => {
    form.submit();
  }

  const onFinishFailed = (values: any) => {
    console.log(values);
    
  }

  return (
    <div>
      <Modal
          title="Basic Modal"
          visible={visible}
          onOk={onOk}
          onCancel={closeHandler}
          forceRender
        >
          <Form
      name="basic"
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label=" Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label=" Email"
        name="email"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label=" Create_time"
        name="create_time"
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
      >
        <Input />
      </Form.Item>
    </Form>
        </Modal>
    </div>
  );
};

export default UserModal;