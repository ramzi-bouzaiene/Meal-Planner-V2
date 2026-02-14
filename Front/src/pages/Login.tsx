import { LoginData } from '../types/authTypes'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import type { FormProps } from 'antd'
import { Button, Divider, Form, Input } from 'antd'

export const Login = () => {
  const navigate = useNavigate()

  const onFinish: FormProps<LoginData>['onFinish'] = async (values) => {
    try {
      console.log('this is form => ', values)
      const loginData = await loginUser(values)
      localStorage.setItem('userId', loginData.userId)
      console.log('loginData', loginData)
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }
  const onFinishFailed: FormProps<LoginData>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<LoginData>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<LoginData>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Divider style={{ borderColor: '#7cb305' }}>
          <a href="/register">Register</a>
        </Divider>
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
