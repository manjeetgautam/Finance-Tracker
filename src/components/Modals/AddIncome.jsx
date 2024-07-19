import React from 'react'
import { Button , Modal , Form , Input , DatePicker , Select} from "antd"


const AddIncomeModal = ({isIncomeModalVisible,
  handleIncomeCancel,
  onFinish,}) => {

  const [form] = Form.useForm()

  return (
    <Modal
    open={isIncomeModalVisible}
    style={{fontWeight:600}}
    title="Add Income"
    onCancel={handleIncomeCancel}
    footer={null}
    >

    <Form
    form={form}
    layout='vertical'
    onFinish={(values)=>{
        onFinish(values, "income");
        form.resetFields();
    }}
    >
    <Form.Item
    style={{fontWeight:600}}
    label="Name"
    name="name"
    rules={[{
        required: true,
        message: "Please select a Name!"
    }]}

    >
    <Input type='text' className='custom-input'/>
    </Form.Item>

    <Form.Item
    style={{fontWeight:600}}
    label="Amount"
    name="amount"
    rules={[{
        required: true,
        message: "Please select a Amount!"
    }]}

    >
    <Input type='number' className='custom-input'/>
    </Form.Item>

    <Form.Item
    style={{fontWeight:600}}
    label="Date"
    name="date"
    rules={[{
        required: true,
        message: "Please select a Date!"
    }]}

    >
    <DatePicker format="YYYY-MMM-DD" className='custom-input'/>
    </Form.Item>
   
   
    <Form.Item
    style={{fontWeight:600}}
    label="Tag"
    name="tag"
    rules={[{
        required: true,
        message: "Please select a Tag!"
    }]}

    >
    <Select className='custlom-input-2'>
      <Select.Option value="salary">Salary</Select.Option>
      <Select.Option value="freelance">Freelance</Select.Option>
      <Select.Option value="investment">Investment</Select.Option>

    </Select>
    </Form.Item>
    <Form.Item>
    <Button className='btn btn-blue' type='primary' htmlType='submit'>Add Income</Button>
    </Form.Item>
   

    </Form>
    </Modal>
  )
}

export default AddIncomeModal