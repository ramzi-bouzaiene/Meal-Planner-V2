import {
  FileTextFilled,
  StarFilled,
  HomeFilled,
  LogoutOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useState } from 'react'

type MenuItem = Required<MenuProps>['items'][number]

const handleFavoriteNav = () => {
  window.location.href = '/favorite'
}

const handleMealPlanNav = () => {
  window.location.href = '/meal-plan'
}

const handleHomeNav = () => {
  window.location.href = '/'
}

const handleLogout = async () => {
  try {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
    localStorage.removeItem('userId')
    window.location.href = '/login'
  } catch (error) {
    console.error('Logout failed:', error)
  }
}

const items: MenuItem[] = [
  {
    key: 'sub0',
    label: 'Home',
    icon: <HomeFilled />,
    onClick: handleHomeNav,
  },
  {
    key: 'sub1',
    label: 'Favorites',
    icon: <StarFilled />,
    onClick: handleFavoriteNav,
  },
  {
    key: 'sub2',
    label: 'Meal Plans',
    icon: <FileTextFilled />,
    onClick: handleMealPlanNav,
  },
  {
    key: 'sub3',
    label: 'Logout',
    icon: <LogoutOutlined />,
    danger: true,
    onClick: handleLogout,
  },
]
const Navbar = () => {
  const [current, setCurrent] = useState('')

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    setCurrent(e.key)
  }
  return (
    <>
      <Menu
        theme="dark"
        onClick={onClick}
        style={{ width: 256, height: '98vh' }}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </>
  )
}

export default Navbar
