import { LoginData } from '../types/authTypes'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'
import type { FormProps } from 'antd'
import { Button, Divider, Form, Input, message } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'

export const Login = () => {
  const navigate = useNavigate()

  const onFinish: FormProps<LoginData>['onFinish'] = async (values) => {
    try {
      const loginData = await loginUser(values)
      localStorage.setItem('userId', loginData.userId)
      message.success('Welcome back! 🎉')
      navigate('/', { replace: true })
    } catch (error) {
      message.error('Login failed. Please check your credentials.')
      console.error('Login failed:', error)
    }
  }

  const onFinishFailed: FormProps<LoginData>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">🍽️</span>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to continue to Meal Planner</p>
        </div>

        <Form
          name="login"
          className="auth-form"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item<LoginData>
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: '#94a3b8' }} />}
              placeholder="Email address"
            />
          </Form.Item>

          <Form.Item<LoginData>
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider className="auth-divider">
          <span style={{ color: '#94a3b8' }}>New to Meal Planner?</span>
        </Divider>

        <div style={{ textAlign: 'center' }}>
          <a href="/register" className="auth-link">
            Create an account →
          </a>
        </div>
      </div>
    </div>
  )
}
