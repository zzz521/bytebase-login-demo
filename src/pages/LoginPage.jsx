import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoginForm from '../components/LoginForm'
import LoadingSpinner from '../components/LoadingSpinner'

/**
 * 登录页面组件
 * 提供 Bytebase 风格的登录界面
 */
const LoginPage = () => {
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  // 如果用户已登录，重定向到仪表板
  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* 头部 Logo 和标题 */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              欢迎使用 Bytebase
            </h2>
            <p className="text-gray-600">
              统一管理所有数据库的单一平台
            </p>
          </div>

          {/* 登录表单 */}
          <LoginForm />

          {/* 底部链接 */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500">
              还没有账户？{' '}
              <a href="#" className="font-medium text-purple-600 hover:text-purple-500 transition-colors">
                注册
              </a>
            </p>
            <p className="text-xs text-gray-400">
              <a href="/env-test" className="hover:text-gray-600 transition-colors">
                环境变量测试
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="absolute bottom-4 left-4 right-4 text-center text-xs text-gray-400">
        <p>© 2024 Bytebase. 保留所有权利。</p>
      </div>
    </div>
  )
}

export default LoginPage