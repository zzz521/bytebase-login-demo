import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { githubAuthService } from '../services/authService'
import LoadingSpinner from '../components/LoadingSpinner'
import { CheckCircle, AlertCircle, Github, ArrowRight } from 'lucide-react'

/**
 * GitHub OAuth 登录成功回调页面
 * 处理 GitHub 授权回调并获取用户信息
 */
const SuccessPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [status, setStatus] = useState('loading') // loading, success, error
  const [userInfo, setUserInfo] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    handleGitHubCallback()
  }, [])

  /**
   * 处理 GitHub OAuth 回调
   */
  const handleGitHubCallback = async () => {
    try {
      setStatus('loading')
      
      // 获取 URL 参数
      const code = searchParams.get('code')
      const state = searchParams.get('state')
      const errorParam = searchParams.get('error')
      const errorDescription = searchParams.get('error_description')

      // 检查是否有错误参数
      if (errorParam) {
        throw new Error(errorDescription || `GitHub 授权失败: ${errorParam}`)
      }

      // 检查是否有授权码
      if (!code) {
        throw new Error('未收到 GitHub 授权码')
      }

      // 验证 state 参数
      const savedState = localStorage.getItem('oauth_state')
      if (state !== savedState) {
        throw new Error('无效的 OAuth 状态参数，可能存在安全风险')
      }

      // 处理回调并获取用户信息
      const userData = await githubAuthService.handleCallback(code)
      
      if (userData) {
        setUserInfo(userData)
        setUser(userData)
        setStatus('success')
        
        // 保存用户信息到本地存储
        localStorage.setItem('bytebase_user', JSON.stringify(userData))
        
        // 3秒后自动跳转到仪表板
        setTimeout(() => {
          navigate('/dashboard')
        }, 3000)
      } else {
        throw new Error('获取用户信息失败')
      }
    } catch (err) {
      console.error('GitHub 登录回调处理失败:', err)
      setError(err.message)
      setStatus('error')
    }
  }

  /**
   * 手动跳转到仪表板
   */
  const goToDashboard = () => {
    navigate('/dashboard')
  }

  /**
   * 返回登录页面
   */
  const backToLogin = () => {
    // 清理相关数据
    localStorage.removeItem('oauth_state')
    localStorage.removeItem('github_access_token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* 主要内容 */}
      <div className="relative z-10 max-w-md w-full">
        <div className="card p-8 text-center animate-slide-up">
          {/* 加载状态 */}
          {status === 'loading' && (
            <>
              <div className="mb-6">
                <LoadingSpinner size="lg" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                正在处理 GitHub 登录...
              </h2>
              <p className="text-gray-600">
                请稍候，我们正在验证您的身份并获取用户信息
              </p>
            </>
          )}

          {/* 成功状态 */}
          {status === 'success' && userInfo && (
            <>
              <div className="mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                登录成功！
              </h2>
              <p className="text-gray-600 mb-6">
                欢迎回来，{userInfo.name || userInfo.login}
              </p>

              {/* 用户信息预览 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={userInfo.avatar_url}
                    alt={userInfo.name || userInfo.login}
                    className="h-12 w-12 rounded-full border-2 border-white shadow-md"
                  />
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900">
                      {userInfo.name || userInfo.login}
                    </h3>
                    <p className="text-sm text-gray-600">@{userInfo.login}</p>
                    {userInfo.email && (
                      <p className="text-xs text-gray-500">{userInfo.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* GitHub 链接 */}
              <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                <Github className="h-4 w-4 mr-2" />
                <span>已通过 GitHub 验证</span>
              </div>

              {/* 操作按钮 */}
              <div className="space-y-3">
                <button
                  onClick={goToDashboard}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  <span>进入仪表板</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
                <p className="text-xs text-gray-500">
                  3秒后将自动跳转...
                </p>
              </div>
            </>
          )}

          {/* 错误状态 */}
          {status === 'error' && (
            <>
              <div className="mb-6">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                登录失败
              </h2>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 text-sm">
                  {error || '未知错误，请重试'}
                </p>
              </div>

              {/* 操作按钮 */}
              <div className="space-y-3">
                <button
                  onClick={backToLogin}
                  className="btn-primary w-full"
                >
                  返回登录页面
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="btn-secondary w-full"
                >
                  重试
                </button>
              </div>
            </>
          )}
        </div>

        {/* 底部信息 */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-400">
            安全提示：请确保您是在官方页面进行登录操作
          </p>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage