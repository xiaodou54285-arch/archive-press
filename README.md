# Archive Press · 纸上档案

**从喜欢的 IP、主题和参考图出发，制作海报，再把评分编成自己的文化刊物。**

一个可在本地运行的原生 JavaScript 工作台。暖纸白、红黑构成、不对称网格，输出独立可用的音乐与动画游戏档案。仓库只含原创几何图形与虚构数据，不附带任何个人收藏、账号、角色海报或第三方 IP 素材。

## 快速开始

需要 Node.js 20+。没有第三方运行依赖，无需 `npm install`。

```sh
npm start
```

打开终端显示的 `http://127.0.0.1:8787`，点击“载入原创示例”体验完整流程。也可通过任意静态服务器运行；工作台使用 ES Modules，需要 HTTP 服务。

## 从参考到出刊

1. **主题与参考**：为音乐、动画游戏两册分别设置标题、喜欢的角色／IP／乐队、构图要求、强调色，上传参考图，确认简报。
2. **海报制作**：导出 Markdown 简报；把简报和参考图交给支持图像生成的 AI 或设计工具。先确认方案、再制作成稿，上传后确认使用。也可先使用原创几何封面。
3. **评分与出刊**：导入 CSV／JSON，或读取自己的 Bangumi 公开收藏；预览后确认替换数据。预览网页，下载首页及两册 HTML。

工作台**不会直接调用付费图像生成 API**。海报通过 AI／人工协作制作，具体流程见 [海报工作流](docs/POSTER-WORKFLOW.md)。不需要将 API Key 放进浏览器。

## 一次性生成网站

工作台点击“备份项目 JSON”，将备份放在仓库外，或放入已忽略的 `private/` 目录：

```sh
npm run build -- private/my-project.local.json dist
```

生成结构：

```text
dist/
  index.html
  music/index.html
  bangumi/index.html
```

每册包含海报、封面、记录、CSS 与原生 JS，可单独离线打开；目录首页按相对路径连接两册。生成目录可部署到 GitHub Pages、Cloudflare Pages 或任意静态托管。生成的网页是当时的数据快照；更新工作台并重新生成即可发布新版本。

```sh
npm run build -- --demo dist
npm test
```

## 评分档案功能

- 两册保持独立，音乐 100 分制，动画／游戏 10 分制。
- 搜索、分类、最低评分与未评分筛选、排序、分页。
- 当前筛选的记录数、已评分数量、均分和比例准确的评分分布。
- 表格／封面墙、作品详情与个人短评、CSV 导出、JSON 备份。
- 音乐 `0` 是有效评分；动画游戏 `0` 表示未评分；未评分不计入均分。
- 海报保持完整比例，参考图不会出现在生成的网站中。

## 数据格式

支持记录数组，或 `{ "rows": [...] }` / `{ "records": [...] }`。兼容 AOTY 档案常用的 `album/artist/rated` 与 Bangumi 档案常用的 `name_cn/name/category` 字段。

```json
[
  {"id":"demo-1","title":"虚构唱片","creator":"示例作者","rating":85,"year":"2026","date":"2026-01-01","comment":"个人短评"}
]
```

CSV 使用同名字段；标签以 `|` 分隔。可选字段：`cover`（PNG/JPEG/WebP 的 base64 data URL）、`url`（HTTP/HTTPS）、`type`、`status`、`tags`。动画游戏 `category` 用 `anime/game` 或 `2/4`。无封面记录可正常显示。参考文件见 [examples/ratings.csv](examples/ratings.csv)。

Bangumi 读取仅在点击同步按钮后发生，使用官方公开 API、完整分页、失败保留当前记录并先展示替换预览。暂不读取私人收藏、不自动下载远程封面、不抓取 AOTY 网页。接口跨域限制或限流会直接显示错误。

## 文件与隐私

草稿保存在当前来源的浏览器 localStorage；参考图和海报会占用空间，容量不足时需主动下载项目备份。备份包含上传的参考图；生成网页只带已确认海报和评分。当前版本没有云账号、后台数据库或服务端同步。

`private/`、`*.local.json`、`dist/` 与 `.env*` 均默认忽略。不要把个人项目备份放进公开仓库。发布作品截图、IP 参考图或生成海报前，应确认自己拥有合适的使用权限。

## 结构

```text
src/app.js       工作台与确认流程、公开收藏读取
src/core.js      数据校验、CSV、统计、独立 HTML 生成
src/style.css    工作台的构成主义排版
scripts/        本地服务器、生成命令
tests/          真实数据边界与导出交互回归
docs/           海报协作流程与设计约束
```

代码采用 MIT 许可。用户提供的图片与第三方 IP 不属于本项目代码许可的授权范围。
