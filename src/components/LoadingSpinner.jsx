import React from 'react'

/**
 * 加载动画组件
 * 提供不同尺寸的加载指示器
 */
const LoadingSpinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-purple-600`}
        role="status"
        aria-label="加载中"
      >
        <span className="sr-only">加载中...</span>
      </div>
    </div>
  )
}

export default LoadingSpinner