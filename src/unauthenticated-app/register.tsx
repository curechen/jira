import { Button, Form, Input } from "antd"
import { useAuth } from "context/auth-context"
import { LongButton } from './index';

export const RegisterScreen = () => {
  // const login = (param:{username: string, password: string}) => {
  //   fetch(`${apiUrl}/login`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(param)
  //   }).then(async response => {
  //     if (response.ok) {
  //     }
  //   })
  // }

  const {register, user} = useAuth()

  const handleSubmit = (values: { username: string, password: string }) => {
    register(values)
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">注册</LongButton>
      </Form.Item>
    </Form>
  )
}