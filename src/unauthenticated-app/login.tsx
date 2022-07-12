import { useAuth } from "context/auth-context"
import { FormEvent } from "react"
import {Button, Form, Input} from 'antd'
import { LongButton } from './index';

const apiUrl = process.env.REACT_APP_API_URL

export const LoginScreen = () => {
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

  const {login, user} = useAuth()

  {/* antd 通过 Form.Item 的 name 属性拿到这里的名称  */}
  const handleSubmit = (values: { username: string, password: string }) => {
    login(values)
  }
  return (
    <Form onFinish={handleSubmit}>
      {
        user ? (<div>登陆成功，用户名：{user.name}</div>) : null
      }
      <Form.Item name={'username'} rules={[{required: true, message: '请输入用户名'}]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name={'password'} rules={[{required: true, message: '请输入密码'}]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton type="primary" htmlType="submit">登录</LongButton>
      </Form.Item>
    </Form>
  )
}