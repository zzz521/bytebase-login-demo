import React from 'react'

/**
 * 环境变量测试组件
 * 用于验证环境变量是否正确加载
 */
const EnvTest = () => {
  const envVars = {
    VITE_GITHUB_CLIENT_ID: import.meta.env.VITE_GITHUB_CLIENT_ID,
    VITE_GITHUB_REDIRECT_URI: import.meta.env.VITE_GITHUB_REDIRECT_URI,
    VITE_GITHUB_SCOPE: import.meta.env.VITE_GITHUB_SCOPE,
    VITE_APP_BASE_URL: import.meta.env.VITE_APP_BASE_URL
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">环境变量测试</h1>
          
          <div className="space-y-4">
            {Object.entries(envVars).map(([key, value]) => (
              <div key={key} className="border-b border-gray-200 pb-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className={`text-sm px-2 py-1 rounded ${
                    value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {value || '未设置'}
                  </span>
                </div>
                {value && (
                  <div className="mt-1 text-sm text-gray-600 break-all">
                    {value}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">说明：</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 绿色表示环境变量已正确设置</li>
              <li>• 红色表示环境变量未设置，将使用默认值</li>
              <li>• 请确保 .env 文件存在并包含正确的配置</li>
            </ul>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              返回登录页
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnvTest