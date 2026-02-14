import { RegisterData } from '../types/authTypes'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'
import type { FormProps } from 'antd'
import { Button, Divider, Form, Input, message } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'

export const Register = () => {
  const navigate = useNavigate()

  const onFinish: FormProps<RegisterData>['onFinish'] = async (values) => {
    try {
      const registerData = await registerUser(values)
      console.log('registerData', registerData)
      message.success('Account created successfully! 🎉')
      navigate('/login')
    } catch (error) {
      message.error('Registration failed. Please try again.')
      console.error('Register failed:', error)
    }
  }

  const onFinishFailed: FormProps<RegisterData>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo">🍽️</span>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Start your meal planning journey today</p>
        </div>

        <Form
          name="register"
          className="auth-form"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item<RegisterData>
            name="username"
            rules={[
              { required: true, message: 'Please enter your username' },
              { min: 3, message: 'Username must be at least 3 characters' }
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: '#94a3b8' }} />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item<RegisterData>
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

          <Form.Item<RegisterData>
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#94a3b8' }} />}
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Account
            </Button>
          </Form.Item>
        </Form>

        <Divider className="auth-divider">
          <span style={{ color: '#94a3b8' }}>Already have an account?</span>
        </Divider>

        <div style={{ textAlign: 'center' }}>
          <a href="/login" className="auth-link">
            Sign in instead →
          </a>
        </div>
      </div>
    </div>
  )
}
