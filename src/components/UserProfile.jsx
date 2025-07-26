import React from 'react'
import { Github, Calendar, Users, GitBranch } from 'lucide-react'

/**
 * 用户资料组件
 * 显示 GitHub 用户的详细信息
 */
const UserProfile = ({ user }) => {
  if (!user) {
    return null
  }

  /**
   * 格式化日期
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="card p-6">
      <div className="text-center">
        {/* 用户头像 */}
        <div className="relative inline-block">
          <img
            className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
            src={user.avatar_url}
            alt={user.name || user.login}
          />
          <div className="absolute bottom-0 right-0 h-6 w-6 bg-green-400 rounded-full border-2 border-white"></div>
        </div>

        {/* 用户基本信息 */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-900">
            {user.name || user.login}
          </h3>
          <p className="text-gray-600">@{user.login}</p>
          {user.email && (
            <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          )}
        </div>

        {/* 用户简介 */}
        {user.bio && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 italic">"{user.bio}"</p>
          </div>
        )}

        {/* GitHub 链接 */}
        <div className="mt-4">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <Github className="h-4 w-4 mr-2" />
            查看 GitHub 资料
          </a>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center mb-1">
              <GitBranch className="h-4 w-4 text-gray-400 mr-1" />
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {user.public_repos || 0}
            </div>
            <div className="text-xs text-gray-500">仓库</div>
          </div>
          <div>
            <div className="flex items-center justify-center mb-1">
              <Users className="h-4 w-4 text-gray-400 mr-1" />
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {user.followers || 0}
            </div>
            <div className="text-xs text-gray-500">关注者</div>
          </div>
          <div>
            <div className="flex items-center justify-center mb-1">
              <Users className="h-4 w-4 text-gray-400 mr-1" />
            </div>
            <div className="text-lg font-semibold text-gray-900">
              {user.following || 0}
            </div>
            <div className="text-xs text-gray-500">关注中</div>
          </div>
        </div>
      </div>

      {/* 加入时间 */}
      {user.created_at && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            <span>加入于 {formatDate(user.created_at)}</span>
          </div>
        </div>
      )}

      {/* 账户状态 */}
      <div className="mt-4">
        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-800">账户已验证</span>
          </div>
          <svg className="h-4 w-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default UserProfile