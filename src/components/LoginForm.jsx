import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Github, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

/**
 * 登录表单组件
 * 提供邮箱密码登录和 GitHub OAuth 登录
 */
const LoginForm = () => {
  const { loginWithGitHub, loading, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  /**
   * 处理表单输入变化
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // 清除错误信息
    if (error) {
      clearError()
    }
  }

  /**
   * 处理邮箱密码登录
   */
  const handleEmailLogin = (e) => {
    e.preventDefault()
    // 这里可以实现邮箱密码登录逻辑
    console.log('邮箱登录:', formData)
    alert('邮箱登录功能待实现')
  }

  /**
   * 处理 GitHub 登录
   */
  const handleGitHubLogin = async () => {
    try {
      console.log('handleGitHubLogin')
      await loginWithGitHub()
    } catch (err) {
      console.error('GitHub 登录失败:', err)
    }
  }

  return (
    <div className="px-[40px] animate-slide-up w-[400px] ">
      {/* 错误提示 */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        </div>
      )}
      {/* Gmail 登录按钮 */}
      <button
        disabled={loading}
        className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-sm shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-2"
      >
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            <Mail className="h-5 w-5 mr-3" />
            <span className="font-medium">继续使用 Google</span>
          </>
        )}
      </button>

      {/* GitHub 登录按钮 */}
      <button
        onClick={handleGitHubLogin}
        disabled={loading}
        className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-sm shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-2"
      >
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            <Github className="h-5 w-5 mr-3" />
            <span className="font-medium">继续使用 GitHub</span>
          </>
        )}
      </button>

      {/* Gmail 登录按钮 */}
      <button
        disabled={loading}
        className="w-full flex items-center px-4 py-3 border border-gray-300 rounded-sm shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mb-2"
      >
        {loading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <>
            <Mail className="h-5 w-5 mr-3" />
            <span className="font-medium">继续使用 Microsoft Account</span>
          </>
        )}
      </button>
      

      {/* 分割线 */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-xs mt-6">
          <span className="px-2 bg-white text-gray-900">或</span>
        </div>
      </div>

      {/* 邮箱密码登录表单 */}
      <form onSubmit={handleEmailLogin} className="space-y-4">
        {/* 邮箱输入 */}
        <div>
          {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            邮箱地址
          </label> */}
          <div className="relative">
            {/* <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div> */}
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="input-field pl-10 rounded-xs"
              placeholder="电子邮箱地址"
            />
          </div>
        </div>

        {/* 密码输入 */}
        {/* <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            密码
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="input-field pl-10 pr-10"
              placeholder="请输入密码"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              )}
            </button>
          </div>
        </div> */}

        {/* 记住我和忘记密码 */}
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              记住我
            </label>
          </div>
          <a href="#" className="text-sm text-purple-600 hover:text-purple-500 transition-colors">
            忘记密码？
          </a>
        </div> */}

        {/* 登录按钮 */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary bg-blue-700 rounded-xs w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <LoadingSpinner size="sm" />
          ) : (
            '继续'
          )}
        </button>
      </form>
      <p className="text-sm mt-4">
        没有账户？{' '}
        <a href="#" className="font-medium text-blue-700 hover:text-blue-600 transition-colors">
          注册
        </a>
      </p>

      {/* 提示信息 */}
      {/* <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          登录即表示您同意我们的{' '}
          <a href="#" className="text-purple-600 hover:text-purple-500">服务条款</a>
          {' '}和{' '}
          <a href="#" className="text-purple-600 hover:text-purple-500">隐私政策</a>
        </p>
      </div> */}
    </div>
  )
}

export default LoginForm