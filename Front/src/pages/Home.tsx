import { Button, Card, Row, Col, Typography } from 'antd'
import { StarFilled, FileTextFilled } from '@ant-design/icons'
import Layout from '../Components/Layout/Layout'
import { useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authService'

const { Title, Paragraph } = Typography

export const Home = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await logoutUser()
      if (response.message) {
        localStorage.removeItem('userId')
        navigate('/login')
      }
    } catch (error) {
      console.error('Logout failed:', error)
      alert('Logout failed. Please try again.')
    }
  }

  return (
    <Layout>
      <div style={{ padding: '24px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <Title level={2} style={{ margin: 0 }}>
            Welcome to Meal Planner
          </Title>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </div>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          Plan your meals, save your favorite recipes, and eat better every day.
        </Paragraph>
        <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
          <Col xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => navigate('/favorite')}
              style={{ textAlign: 'center', minHeight: '200px' }}
            >
              <StarFilled
                style={{ fontSize: '48px', color: '#faad14', marginBottom: '16px' }}
              />
              <Title level={4}>Favorites</Title>
              <Paragraph>Save and manage your favorite recipes</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              hoverable
              onClick={() => navigate('/meal-plan')}
              style={{ textAlign: 'center', minHeight: '200px' }}
            >
              <FileTextFilled
                style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }}
              />
              <Title level={4}>Meal Plans</Title>
              <Paragraph>Plan your meals for the week</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}
