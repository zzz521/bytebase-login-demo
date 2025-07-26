import axios from 'axios'

// GitHub OAuth 配置
const GITHUB_CONFIG = {
  clientId: import.meta.env.VITE_GITHUB_CLIENT_ID || 'your_github_client_id',
  redirectUri: import.meta.env.VITE_GITHUB_REDIRECT_URI || `${window.location.origin}/success`,
  scope: import.meta.env.VITE_GITHUB_SCOPE || 'user:email'
}

/**
 * GitHub 认证服务类
 * 处理 GitHub OAuth 登录流程
 */
class GitHubAuthService {
  /**
   * 启动 GitHub OAuth 登录流程
   * @returns {Promise<Object>} 用户信息
   */
  async login() {
    try {
      // 检查是否有授权码
      const urlParams = new URLSearchParams(window.location.search)
      const code = urlParams.get('code')
      
      if (code) {
        // 如果有授权码，获取访问令牌和用户信息
        return await this.handleCallback(code)
      } else {
        // 如果没有授权码，重定向到 GitHub 授权页面
        await this.redirectToGitHub()
        return null
      }
    } catch (error) {
      console.error('GitHub 登录失败:', error)
      throw new Error('GitHub 登录失败，请重试')
    }
  }

  /**
   * 重定向到 GitHub 授权页面
   */
 async redirectToGitHub() {
    const state = this.generateRandomState()
    localStorage.setItem('oauth_state', state)
    
    const authUrl = new URL('https://github.com/login/oauth/authorize')
    authUrl.searchParams.append('client_id', GITHUB_CONFIG.clientId)
    authUrl.searchParams.append('redirect_uri', GITHUB_CONFIG.redirectUri)
    authUrl.searchParams.append('scope', GITHUB_CONFIG.scope)
    authUrl.searchParams.append('state', state)
    window.location.href = authUrl.toString()
  }

  /**
   * 处理 GitHub OAuth 回调
   * @param {string} code - 授权码
   * @returns {Promise<Object>} 用户信息
   */
  async handleCallback(code) {
    // 验证 state 参数
    const urlParams = new URLSearchParams(window.location.search)
    const state = urlParams.get('state')
    const savedState = localStorage.getItem('oauth_state')
    
    if (state !== savedState) {
      throw new Error('无效的 OAuth 状态参数')
    }
    
    // 清理 URL 参数
    window.history.replaceState({}, document.title, window.location.pathname)
    localStorage.removeItem('oauth_state')
    
    // 在实际应用中，这里应该调用后端 API 来交换访问令牌
    // 为了演示目的，我们模拟这个过程
    const accessToken = await this.exchangeCodeForToken(code)
    const userInfo = await this.getUserInfo(accessToken)
    
    return userInfo
  }

  /**
   * 交换授权码获取访问令牌
   * 注意：在生产环境中，这个操作应该在后端完成，以保护客户端密钥
   * @param {string} code - 授权码
   * @returns {Promise<string>} 访问令牌
   */
  async exchangeCodeForToken(code) {
    // 在实际应用中，这个请求应该发送到你的后端服务器
    // 后端服务器使用客户端密钥来交换访问令牌
    
    // 这里我们模拟一个成功的响应
    // 在真实环境中，你需要实现后端 API
    console.warn('注意：在生产环境中，令牌交换应该在后端完成')
    
    // 模拟访问令牌（实际应用中从后端获取）
    const mockToken = 'mock_github_access_token_' + Date.now()
    localStorage.setItem('github_access_token', mockToken)
    
    return mockToken
  }

  /**
   * 获取 GitHub 用户信息
   * @param {string} accessToken - 访问令牌
   * @returns {Promise<Object>} 用户信息
   */
  async getUserInfo(accessToken) {
    try {
      // 在实际应用中，这里应该使用真实的访问令牌调用 GitHub API
      // 为了演示目的，我们返回模拟数据
      
      // const response = await axios.get('https://api.github.com/user', {
      //   headers: {
      //     Authorization: `token ${accessToken}`,
      //     Accept: 'application/vnd.github.v3+json'
      //   }
      // })
      // return response;
      
      // 模拟 GitHub 用户数据
      const mockUserData = {
        id: 12345,
        login: 'demo_user',
        name: '演示用户',
        email: 'demo@example.com',
        avatar_url: 'https://avatars.githubusercontent.com/u/12345?v=4',
        html_url: 'https://github.com/demo_user',
        bio: 'Bytebase 演示用户',
        public_repos: 10,
        followers: 5,
        following: 8,
        created_at: '2020-01-01T00:00:00Z'
      }
      
      return mockUserData
    } catch (error) {
      console.error('获取用户信息失败:', error)
      throw new Error('获取用户信息失败')
    }
  }

  /**
   * 生成随机状态字符串
   * @returns {string} 随机状态字符串
   */
  generateRandomState() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15)
  }

  /**
   * 退出登录
   */
  logout() {
    localStorage.removeItem('github_access_token')
    localStorage.removeItem('oauth_state')
  }
}

// 导出服务实例
export const githubAuthService = new GitHubAuthService()