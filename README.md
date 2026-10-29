# 李卓 / 电商视觉设计师 · 作品集

线上仓库：<https://github.com/lizhuo200222-ux/lizhuo-portfolio>（公开）

站点由两套页面组成：

| 路径 | 说明 |
| --- | --- |
| `index.html` | 首页（Framer 导出版，深色叙事 + 首屏视频 + 液态鼠标效果） |
| `public/about/` | 关于我 |
| `public/contact/` | 联系我 |
| `public/work/portfolio/<case>/` | 4 个案例详情页 |
| `public/portfolio-template/` | 电商详情页模板系统（11 页） |

## 本地预览

```bash
npm install
npm run start        # 等价于 vite preview --port 4173
```

打开 <http://127.0.0.1:4173/>。预览服务读的是 `dist/`，所以改完 `index.html` / `public/` 之后需要同步到 `dist/`：

```powershell
Copy-Item index.html dist\index.html -Force
Copy-Item public\portfolio-shell.js,public\portfolio-personalize.js dist\ -Force
```

> 注意：`vite.config.js` 里注册了 `pretty-urls-redirect` 中间件，把 `/about`、`/contact`、`/work/portfolio` 这类少写尾斜杠的地址 301 到正确地址；`dist/_redirects` 是给 Netlify 用的同一套规则。

## 自动同步到 GitHub

三种方式，任选其一：

```powershell
npm run sync        # 手动：提交 + 推送
npm run watch:push  # 监听：改动稳定后自动提交 + 推送（本会话已在跑）
```

另外 `.git/hooks/post-commit` 已配置：任何一次 `git commit` 之后都会自动 `git push`。

提交信息默认是 `auto: yyyy-MM-dd HH:mm:ss`，也可以自己指定：

```powershell
.\tools\sync.ps1 -Message "改了什么"
```

## 目录约定

- `index.html`、`public/`：**源文件，改这里**
- `dist/`：预览与部署用的产物（未纳入 git）
- `src/`：早期 React 版首页，目前只有 `fuel-exact.js` 被引用（首屏视频层），不要删
- `tools/`：`sync.ps1`（提交推送）、`watch-push.ps1`（监听自动推送）

## 说明

- 仓库里不含 `node_modules/`、`dist/`、`tmp/`，克隆后执行 `npm install` 即可。
- 若要用 GitHub Pages 部署，需要把 `dist/` 一并提交或改用 Actions 构建；当前仓库只托管源码。
- `portfolio-shell.js` 是基于 Framer 客户端渲染打的补丁层（删入口、改文案、移动端菜单、可访问性），替换模板页时要同步更新。
