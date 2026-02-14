import {
  FileTextFilled,
  StarFilled,
  HomeFilled,
  LogoutOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [current, setCurrent] = useState('')

  useEffect(() => {
    const path = location.pathname
    if (path === '/') setCurrent('home')
    else if (path === '/favorite') setCurrent('favorites')
    else if (path === '/meal-plan') setCurrent('meal-plans')
  }, [location])

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      localStorage.removeItem('userId')
      navigate('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const items: MenuItem[] = [
    {
      key: 'brand',
      label: (
        <div style={{
          padding: '20px 0',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '8px'
        }}>
          <span style={{ fontSize: '32px' }}>🍽️</span>
          <div style={{
            fontSize: '18px',
            fontWeight: '700',
            color: 'white',
            marginTop: '8px',
            letterSpacing: '-0.5px'
          }}>
            Meal Planner
          </div>
        </div>
      ),
      disabled: true,
      style: { cursor: 'default', height: 'auto' }
    },
    {
      key: 'home',
      label: 'Dashboard',
      icon: <HomeFilled style={{ fontSize: '18px' }} />,
      onClick: () => navigate('/'),
    },
    {
      key: 'favorites',
      label: 'My Favorites',
      icon: <StarFilled style={{ fontSize: '18px' }} />,
      onClick: () => navigate('/favorite'),
    },
    {
      key: 'meal-plans',
      label: 'Meal Plans',
      icon: <FileTextFilled style={{ fontSize: '18px' }} />,
      onClick: () => navigate('/meal-plan'),
    },
    {
      type: 'divider',
      style: { margin: '16px 0', borderColor: 'rgba(255,255,255,0.1)' }
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined style={{ fontSize: '18px' }} />,
      danger: true,
      onClick: handleLogout,
    },
  ]

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key !== 'brand') {
      setCurrent(e.key)
    }
  }

  return (
    <div style={{
      width: '280px',
      height: '100vh',
      background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
      boxShadow: '4px 0 20px rgba(0, 0, 0, 0.1)',
    }}>
      <Menu
        theme="dark"
        onClick={onClick}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          border: 'none',
          padding: '8px'
        }}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </div>
  )
}

export default Navbar
