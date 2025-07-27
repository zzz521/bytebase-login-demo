import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import LoginForm from '../components/LoginForm'
import LoadingSpinner from '../components/LoadingSpinner'
import loginBg from '../assets/login-bg.webp'
import logo from '../assets/logo.svg'

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
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      {/* 背景遮罩 */}

      {/* 主要内容 */}
      <div className="relative z-10 flex min-h-screen">
        {/* 左侧内容 */}
        <div className="w= flex-1 flex items-center justify-end px-4 sm:px-6">
        <div className="px-36 w-1/2 flex justify-center items-center flex-col">
          {/* 头部 Logo 和标题 */}
          <div className="text-center p-[40px] pb-[6]">
            <div className="rounded-xl flex items-center justify-center mb-6">
              <img src={logo} alt="logo" className='w-[240px]' />
            </div>
            <h2 className="text-2xl mt-6 mb-4">
              欢迎
            </h2>
            <p className="text-sm">
              登录 Bytebase 以继续使用 Bytebase Hub。
            </p>
          </div>

          {/* 登录表单 */}
          <LoginForm />

          {/* 底部链接 */}
          <div className="text-center">
            {/* <p className="text-xs text-gray-400">
              <a href="/env-test" className="hover:text-gray-600 transition-colors">
                环境变量测试
              </a>
            </p> */}
          </div>
          </div>
        </div>
      </div>

      {/* 底部信息 */}
      {/* <div className="absolute bottom-4 left-4 right-4 text-center text-xs text-gray-400">
        <p>© 2024 Bytebase. 保留所有权利。</p>
      </div> */}
    </div>
  )
}

export default LoginPage