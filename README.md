# Bytebase 登录页面演示

这是一个基于 React 的 Bytebase 风格登录页面演示项目，实现了 GitHub OAuth 第三方登录功能。

## 功能特性

- 🎨 **Bytebase 风格 UI**: 完全复制 Bytebase 的视觉设计风格
- 🔐 **GitHub OAuth 登录**: 支持 GitHub 第三方登录
- 📱 **响应式设计**: 完美适配桌面端和移动端
- ⚡ **现代技术栈**: 使用 React 18 + Vite + Tailwind CSS
- 🎭 **优雅动画**: 流畅的页面过渡和交互动画
- 🛡️ **类型安全**: 完整的 TypeScript 支持（可选）

## 技术栈

- **前端框架**: React 18
- **构建工具**: Vite
- **样式框架**: Tailwind CSS
- **路由管理**: React Router DOM
- **图标库**: Lucide React
- **HTTP 客户端**: Axios

## 项目结构

```
src/
├── components/          # 可复用组件
│   ├── LoginForm.jsx   # 登录表单组件
│   ├── UserProfile.jsx # 用户资料组件
│   └── LoadingSpinner.jsx # 加载动画组件
├── contexts/           # React 上下文
│   └── AuthContext.jsx # 认证状态管理
├── pages/              # 页面组件
│   ├── LoginPage.jsx   # 登录页面
│   └── Dashboard.jsx   # 仪表板页面
├── services/           # 业务逻辑服务
│   └── authService.js  # 认证服务
├── App.jsx            # 应用主组件
├── main.jsx           # 应用入口
└── index.css          # 全局样式
```

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 GitHub OAuth

1. 在 GitHub 上创建一个新的 OAuth App：
   - 访问 [GitHub Developer Settings](https://github.com/settings/developers)
   - 点击 "New OAuth App"
   - 填写应用信息：
     - Application name: `Bytebase Login Demo`
     - Homepage URL: `http://localhost:3000`
     - Authorization callback URL: `http://localhost:3000/login`

2. 获取 Client ID 并更新配置：
   - 复制生成的 Client ID
   - 在 `src/services/authService.js` 中更新 `GITHUB_CONFIG.clientId`

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 4. 构建生产版本

```bash
npm run build
```

## 使用说明

### GitHub 登录流程

1. 点击 "使用 GitHub 登录" 按钮
2. 重定向到 GitHub 授权页面
3. 授权后返回应用并自动登录
4. 显示用户信息和仪表板

### 响应式设计

- **桌面端**: 完整的双栏布局，展示所有功能
- **平板端**: 自适应布局，保持良好的用户体验
- **移动端**: 单栏布局，优化触摸操作

## 设计原则

### 代码规范

- 使用函数式组件和 React Hooks
- 遵循单一职责原则
- 组件命名使用 PascalCase
- 函数命名使用 camelCase
- 所有函数都有详细的 JSDoc 注释

### 样式规范

- 使用 Tailwind CSS 实用类
- 遵循 BEM 命名规范（自定义组件）
- 响应式优先的设计方法
- 一致的颜色和间距系统

### 安全考虑

- OAuth 状态参数验证
- 敏感信息不在前端存储
- 生产环境中的令牌交换应在后端完成

## 自定义配置

### 主题颜色

在 `tailwind.config.js` 中修改主题颜色：

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // 自定义主色调
      }
    }
  }
}
```

### 认证配置

在 `src/services/authService.js` 中修改 OAuth 配置：

```javascript
const GITHUB_CONFIG = {
  clientId: 'your_github_client_id',
  redirectUri: 'your_redirect_uri',
  scope: 'user:email'
}
```

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署完成

### Netlify 部署

1. 构建项目：`npm run build`
2. 将 `dist` 目录上传到 Netlify
3. 配置重定向规则

## 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 提交 Pull Request

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue 或联系开发者。