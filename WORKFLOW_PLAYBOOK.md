# 旧版作品集继续修改操作手册

这是一份给迁移后 Codex 的短流程。详细的用户决定和文件映射见 `CODEX_HANDOFF.md`；机器可读约束见 `codex-project-context.json`。

## 1. 开始前

在项目根目录执行：

```powershell
npm ci
node --test src/portfolioPresentation.test.js src/generationWorkbench.test.js src/portfolioEffects.test.js src/galleryLayout.test.js src/circularGalleryContract.test.js
npm run build
```

如果只是先看网页：

```powershell
npm run start
```

打开 `http://127.0.0.1:4173/#bracelet-case`。端口冲突时改用 `4174`，不要修改源码里的旧版路由。

## 2. 先判断用户要改哪个区

| 用户看到的内容 | 先读的文件 | 主要检查 |
| --- | --- | --- |
| 手串主图/详情 | `src/main.jsx`、`src/data.js`、`src/components/AccordionGallery.jsx`、`MorphSlider.jsx` | 主图比例、键盘、灯箱、hash 是否稳定 |
| 系列海报扇形/深度轮播 | `src/main.jsx`、`src/data.js`、`DepthCarousel.jsx/.css` | 47 张真实海报、按钮、拖动、自动循环、点击放大 |
| 生图工作台三张界面图 | `src/main.jsx`、`MorphSlider.jsx/.css` | 必须手动切换，`autoplay={false}`，点击放大 |
| 批量候选/过程结果 | `src/main.jsx`、`Masonry.jsx/.css`、`ImageLightbox.jsx` | 人物 10 张、西瓜展示 9 张、结果比例、灯箱 |
| About 标题 | `VariableProximity.jsx/.css`、`src/main.jsx` | 靠近字母变重、离开重置、减少动效 |
| 首页滚动画廊 | `CircularGallery.jsx/.css`、`src/main.jsx` | 真实本地素材、连续运动、响应式和无横向溢出 |

## 3. 旧版不变量

- 旧版页面顺序和暗色视觉外壳是当前基线。
- 人物球面墙和重复 IP 区已经删除；不要因参考图重新挂载。
- 不要加回蓝色底部动效、空洞球面或相互穿插的卡片。
- 不要把工作台 UI 轮播改成等待时自动播放。
- 不要用远程占位图替换 `public/assets` 的真实作品。
- 不要直接编辑 `dist/`；改 `src/` 后重新构建。

## 4. 每次改动后的验收

先跑测试和构建，再开浏览器检查：

1. 桌面约 `1440 x 900`：目标区是否完整、主次是否清楚。
2. 移动约 `390 x 844`：无横向溢出、文字不被裁切、控件可点。
3. 关键交互：按钮/键盘/拖动/点击放大是否仍可用。
4. 状态：空素材、减少动效、异步图片加载后的 hash 定位是否正常。
5. 控制台错误和网络图片响应是否为 0 错误/200。

证据写入 `output/playwright/`，并在 `design-qa.md` 记录新结论。只读代码不能代替浏览器截图。

## 5. 继续打包

源码和素材有实质变化后，在项目根目录执行：

```powershell
.\package-migration.ps1 -OutputDirectory 'C:\Users\<用户名>\Documents\li-zhuo-portfolio-transfer'
```

脚本会自动排除依赖、虚拟环境、缓存、浏览器状态和独立接单台账，生成 ZIP、逐文件 `MIGRATION_MANIFEST.json` 和 `SHA256SUMS.txt`。目标电脑解压后执行：

```powershell
.\verify-migration.ps1 -Install -Build -Test
```

只有看到 `migration_status=verified`，才可以把本地迁移状态写成 `verified_solution`。跨电脑的浏览器视觉验收仍需单独截图确认。

## 6. 安全边界

不要把 `OMINIAPI_API_KEY` 的值写入源码、清单、日志或 Codex 消息；它只能由操作者在需要调用生图脚本时临时设置。不要迁移浏览器 profile、Cookie、登录状态、密码或 MCP 凭证。
