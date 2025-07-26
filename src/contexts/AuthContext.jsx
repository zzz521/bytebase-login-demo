import React, { createContext, useContext, useState, useEffect } from 'react'
import { githubAuthService } from '../services/authService'

// 认证上下文
const AuthContext = createContext()

/**
 * 认证状态管理 Hook
 * @returns {Object} 认证相关的状态和方法
 */
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 内部使用')
  }
  return context
}

/**
 * 认证提供者组件
 * 管理用户认证状态和相关操作
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 组件挂载时检查本地存储的用户信息
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const savedUser = localStorage.getItem('bytebase_user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (err) {
        console.error('检查认证状态失败:', err)
        localStorage.removeItem('bytebase_user')
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  /**
   * GitHub OAuth 登录
   */
  const loginWithGitHub = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const userData = await githubAuthService.login()
      setUser(userData)
      localStorage.setItem('bytebase_user', JSON.stringify(userData))
      
      return userData
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  /**
   * 退出登录
   */
  const logout = () => {
    setUser(null)
    setError(null)
    localStorage.removeItem('bytebase_user')
    localStorage.removeItem('github_access_token')
  }

  /**
   * 设置用户信息
   * @param {Object} userData - 用户数据
   */
  const setUserData = (userData) => {
    setUser(userData)
    if (userData) {
      localStorage.setItem('bytebase_user', JSON.stringify(userData))
    }
  }

  /**
   * 清除错误状态
   */
  const clearError = () => {
    setError(null)
  }

  const value = {
    user,
    loading,
    error,
    loginWithGitHub,
    logout,
    clearError,
    setUser: setUserData,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}