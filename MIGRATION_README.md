# 李卓作品集旧版迁移包

这份目录是当前旧版作品集的可迁移工作副本。目标是在另一台 Windows 电脑解压后，继续修改同一个旧版网页，不自动切换到被放弃的新改版。

## 快速启动

在解压后的项目根目录打开 PowerShell：

```powershell
npm ci
npm run start
Start-Process http://127.0.0.1:4173/#bracelet-case
```

如果 `4173` 已被占用，可以使用：

```powershell
npm run dev -- --host 127.0.0.1 --port 4174
Start-Process http://127.0.0.1:4174/#bracelet-case
```

建议先做迁移自检：

```powershell
.\verify-migration.ps1
```

在新电脑上做一次干净安装、构建和测试：

```powershell
.\verify-migration.ps1 -Install -Build -Test
```

## 环境要求

- Windows 10/11；`verify-migration.ps1` 和 `package-migration.ps1` 兼容 Windows PowerShell 5.1 与 PowerShell 7。
- Node.js 18 或更高版本；建议使用当前电脑的 Node 24 LTS 级别版本。
- npm 9 或更高版本。
- 网站本身只需要 Node/npm，不需要登录、Cookie 或浏览器配置。
- `generate_pool_model_batch.py` 只有在重新调用 OminiAPI 时才需要环境变量 `OMINIAPI_API_KEY`。包内没有这个值；如需运行该脚本，请在新电脑由操作者自行设置，不要把密钥写进文件。
- `视频剪辑` 下的独立视频脚本可能还需要 Python、ffmpeg 或 Edge TTS；它们不是网页启动的前置条件。

## 当前旧版入口

- `#bracelet-case`：手串商业视觉旧版案例。
- `#poster-gallery`：47 张真实海报的手动/拖动深度轮播和点击放大。
- `#generation-workbench`：三张工作台界面图的手动轮播；候选图和结果图可点击放大。
- `#about`：About 区的 `Hi, I am Li Zhuo!` 字母靠近变重效果。
- `#ai-people-case`：人物球面墙已按最新要求从页面 DOM 移除，但可复用组件仍保留在 `src/components/DomeGallery.jsx`。

旧版约束要继续保留：不恢复被删除的墙、不重新叠加蓝色底部动效、不把手动轮播改成自动播放。之后的改动应以当前源码和截图证据为基线。

## 目录用途

- `src/`：React 页面、组件、样式、数据和测试。
- `public/assets/`：网页直接使用的真实图片、视频、PDF 和 47 张海报。
- `docs/`、`design-qa.md`：设计决策、过程记录、用户参考截图和验证证据。
- `docs/references/source-materials/poster-originals/`：从用户指定的桌面目录复制的 47 张原始海报输入。
- `output/`、`outputs/`：浏览器截图、QA 产物和历史输出。
- `tmp/`、`video_work/`、`视频剪辑/`：相关原始素材、视频制作文件和可复用脚本。
- `dist/`：当前一次生产构建结果，方便先看静态产物；继续开发仍以 `src/` 为准。
- `.git/`：当前项目 Git 历史。解压到新目录后再开始提交，不要覆盖新电脑已有项目。

## 修改入口

```text
src/main.jsx          页面结构、路由和交互组合
src/data.js           案例文案、图片清单和轮播数据
src/styles.css        全局布局、响应式和视觉 tokens
src/components/       轮播、灯箱、动效等可复用组件
public/assets/        真实作品素材
```

## 迁移边界

已保留：

- 旧版作品集源码、组件、数据、样式、测试和配置。
- `public/assets` 中当前页面使用的全部真实素材，包括 47 张海报、FORMA 工作台素材、手串案例和视频。
- 用户指定海报目录的 47 张原始输入，以及重命名后的参考截图。
- `dist`、截图、QA 文档、设计稿、过程素材和相关视频制作文件。
- 当前项目的 Git 元数据和可见验证记录。

未打包：

- `node_modules/` 和 `兼职接单/.build/node_modules/`：依赖可由 `npm ci` 按 lockfile 重建。
- `视频剪辑/` 内的 Python `.venv/`、各级 `__pycache__/`：机器相关运行环境和缓存。
- `.playwright-cli/`、`.superpowers/`：本机工具状态，不携带浏览器会话或登录信息。
- 工作区中独立的 `兼职接单/` 接单台账和与网页无关的 offboarding 记录。

排除项不会影响网页启动；它们只是需要在目标电脑重新安装或不属于这个网页项目的本机资料。

## 验收证据

迁移包旁边的 `MIGRATION_MANIFEST.json` 记录相对路径、文件大小和 SHA-256；`SHA256SUMS.txt` 记录 ZIP 的整体哈希。解压后运行 `verify-migration.ps1 -Install -Build -Test`，看到 `migration_status=verified` 才算新电脑上的本地包验收通过。网页真实浏览器验收仍应单独打开桌面和移动端检查。

## 安全提示

包内不包含密码、Token、Cookie、API Key、浏览器登录态或 MCP 凭证。请把 ZIP 解压到新目录，不要直接覆盖另一台电脑已有的项目；如果目标目录已有同名文件，先备份再合并。
