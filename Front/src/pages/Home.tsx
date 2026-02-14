import { Row, Col, Typography } from 'antd'
import {
  StarFilled,
  FileTextFilled,
  CalendarFilled,
  HeartFilled
} from '@ant-design/icons'
import Layout from '../Components/Layout/Layout'
import { useNavigate } from 'react-router-dom'

const { Title, Paragraph } = Typography

export const Home = () => {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="page-container">
        {/* Header Section */}
        <div style={{ marginBottom: '40px' }}>
          <Title
            level={1}
            style={{
              margin: 0,
              fontSize: '36px',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to Meal Planner 👋
          </Title>
          <Paragraph style={{ fontSize: '17px', color: '#64748b', marginTop: '12px', marginBottom: 0 }}>
            Plan your meals, save your favorite recipes, and eat better every day.
          </Paragraph>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon purple">
              <CalendarFilled />
            </div>
            <div className="stat-content">
              <h4>Plan Ahead</h4>
              <p>Weekly meal plans</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon amber">
              <HeartFilled />
            </div>
            <div className="stat-content">
              <h4>Stay Healthy</h4>
              <p>Balanced nutrition</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon green">
              <StarFilled />
            </div>
            <div className="stat-content">
              <h4>Save Time</h4>
              <p>Quick recipes</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Title level={4} style={{ marginBottom: '20px', color: '#475569' }}>
          Quick Actions
        </Title>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <div
              className="dashboard-card"
              onClick={() => navigate('/favorite')}
            >
              <StarFilled className="dashboard-card-icon favorites-icon" />
              <h3 className="dashboard-card-title">My Favorites</h3>
              <p className="dashboard-card-description">
                Save and manage your favorite recipes in one place
              </p>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div
              className="dashboard-card"
              onClick={() => navigate('/meal-plan')}
            >
              <FileTextFilled className="dashboard-card-icon meal-plans-icon" />
              <h3 className="dashboard-card-title">Meal Plans</h3>
              <p className="dashboard-card-description">
                Create and organize your weekly meal schedule
              </p>
            </div>
          </Col>
        </Row>

        {/* Tips Section */}
        <div style={{
          marginTop: '40px',
          padding: '24px',
          background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
          borderRadius: '16px',
        }}>
          <Title level={5} style={{ margin: 0, color: '#4338ca' }}>
            💡 Pro Tip
          </Title>
          <Paragraph style={{ margin: '8px 0 0 0', color: '#4338ca' }}>
            Start by adding your favorite recipes, then use them to build your weekly meal plans!
          </Paragraph>
        </div>
      </div>
    </Layout>
  )
}
