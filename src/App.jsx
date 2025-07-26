import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import SuccessPage from './pages/SuccessPage'
import EnvTest from './components/EnvTest'
import { AuthProvider } from './contexts/AuthContext'

/**
 * 应用程序主组件
 * 提供路由配置和认证上下文
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/env-test" element={<EnvTest />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App