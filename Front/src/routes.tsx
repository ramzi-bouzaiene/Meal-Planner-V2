import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { MealPlans } from './pages/MealPlan'
import { Favorites } from './pages/Favorites'
import { ProtectedRoute } from './utils/ProtectedRoute'

const AppRoutes = () => {
  const userId = localStorage.getItem('userId')
  const isAuthenticated = !!userId
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/meal-plan" element={<MealPlans />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
