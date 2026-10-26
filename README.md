# 李卓 / AI 电商视觉作品集

React + Vite 的单页作品集基础版本。页面内容来自简历事实，作品图使用当前工作区中的真实本地素材，后续可以直接替换 `public/assets` 下的图片。

## Run

```bash
npm install
npm run start
```

打开 `http://127.0.0.1:4173/`。这个地址只在运行项目的本机可用。

也可以使用 `npm run dev`，但需要手动指定端口：

```bash
npm run dev -- --host 127.0.0.1 --port 4173
```

## Build

```bash
npm run build
```

主要内容数据集中在 `src/data.js`，页面结构在 `src/main.jsx`，视觉系统在 `src/styles.css`。首页动态背景使用 `public/assets/hero-motion.mp4`；开门过程已经包含在用户提供的视频中，页面不再叠加 CSS 滚轮门板。

## Migration

跨电脑继续修改时，先阅读 [`MIGRATION_README.md`](./MIGRATION_README.md)，再运行 [`verify-migration.ps1`](./verify-migration.ps1)。迁移包保留当前旧版作品集、真实素材、测试证据和构建产物；依赖目录与本机浏览器状态需要在新电脑重新生成。
