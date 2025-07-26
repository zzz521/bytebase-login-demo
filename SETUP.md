# GitHub OAuth 配置指南

## 步骤 1: 创建 GitHub OAuth App

1. 访问 [GitHub Developer Settings](https://github.com/settings/developers)
2. 点击 "New OAuth App"
3. 填写应用信息：
   - **Application name**: `Bytebase Login Demo`
   - **Homepage URL**: `http://localhost:3000`
   - **Application description**: `Bytebase 风格的登录页面演示`
   - **Authorization callback URL**: `http://localhost:3000/login`

4. 点击 "Register application"

## 步骤 2: 获取配置信息

1. 在创建的 OAuth App 页面，复制 **Client ID**
2. 如果需要，可以生成 **Client Secret**（本演示项目不需要）

## 步骤 3: 配置环境变量

### 创建 .env 文件
在项目根目录创建 `.env` 文件（注意：不是 `.env.example`）：

```bash
# 复制示例文件
cp .env.example .env
```

或者手动创建 `.env` 文件并添加以下内容：

```env
# GitHub OAuth 配置
VITE_GITHUB_CLIENT_ID=你的_GitHub_Client_ID
VITE_APP_BASE_URL=http://localhost:3000
VITE_GITHUB_REDIRECT_URI=http://localhost:3000/success
VITE_GITHUB_SCOPE=user:email
```

### 重要说明
- **必须创建 `.env` 文件**：Vite 只会读取 `.env` 文件中的环境变量，不会读取 `.env.example`
- **环境变量前缀**：所有环境变量必须以 `VITE_` 开头才能在客户端代码中使用
- **端口配置**：确保 `VITE_APP_BASE_URL` 和 `VITE_GITHUB_REDIRECT_URI` 中的端口号与 Vite 配置一致（默认 3000）

### 验证环境变量
访问 [http://localhost:3000/env-test](http://localhost:3000/env-test) 来验证环境变量是否正确加载。

## 步骤 4: 启动应用

```bash
npm install
npm run dev
```

## 注意事项

### 安全考虑

- **Client Secret**: 在生产环境中，Client Secret 应该保存在后端服务器中，不应该暴露在前端代码中
- **重定向 URI**: 确保重定向 URI 与 GitHub OAuth App 中配置的完全一致
- **作用域**: 只请求应用需要的最小权限

### 生产环境部署

在生产环境中部署时，需要：

1. 更新 GitHub OAuth App 的配置：
   - Homepage URL: 你的生产域名
   - Authorization callback URL: `https://yourdomain.com/login`

2. 更新环境变量：
   ```env
   VITE_GITHUB_CLIENT_ID=你的_github_client_id
   VITE_APP_BASE_URL=https://yourdomain.com
   VITE_GITHUB_REDIRECT_URI=https://yourdomain.com/login
   ```

3. 实现后端 API 来处理令牌交换（推荐）

### 故障排除

#### 常见问题

1. **"redirect_uri_mismatch" 错误**
   - 检查 GitHub OAuth App 中的 Authorization callback URL 是否与代码中的 redirectUri 一致

2. **"invalid_client" 错误**
   - 检查 Client ID 是否正确
   - 确保环境变量已正确设置

3. **用户信息获取失败**
   - 检查 GitHub 用户的邮箱是否设为公开
   - 确保请求的作用域包含必要的权限

#### 调试技巧

1. 打开浏览器开发者工具查看控制台错误
2. 检查网络请求是否成功
3. 验证环境变量是否正确加载：
   ```javascript
   console.log('GitHub Client ID:', import.meta.env.VITE_GITHUB_CLIENT_ID)
   ```

## 进一步开发

### 添加更多 OAuth 提供商

可以参考 GitHub OAuth 的实现，添加其他提供商：
- Google OAuth
- GitLab OAuth
- Microsoft OAuth

### 后端集成

建议实现后端 API 来：
- 安全地处理令牌交换
- 存储用户会话
- 管理用户权限
- 提供 API 认证