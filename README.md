# Archive Press · 纸上档案

**从喜欢的 IP、主题和参考图出发，制作海报，再把评分编成自己的文化刊物。**

一个可在本地运行的原生 JavaScript 工作台。暖纸白、红黑构成、不对称网格，输出独立可用的音乐与动画游戏档案。默认模板使用原创几何图形与虚构数据，不包含个人收藏或账号。另附一个独立的亚瑟海报案例，展示从官方参考图到生成成稿的过程，素材来源与许可范围单独标注。

## 快速开始

需要 Node.js 20+。没有第三方运行依赖，无需 `npm install`。

```sh
npm start
```

打开终端显示的 `http://127.0.0.1:8787`，点击“载入原创示例”体验完整流程。也可通过任意静态服务器运行；工作台使用 ES Modules，需要 HTTP 服务。

## 先看示例，再试做

- 成品示例：运行工作台后，打开 [示例首页](http://127.0.0.1:8787/examples/site/index.html)，可进入音乐、动画游戏两个分册，体验筛选、分页、详情和导出。
- 也可以直接下载仓库后双击 `examples/site/index.html`，无需启动工作台。
- 工作台顶部点击“填入示例并试做”，确认替换草稿，随后点“03 / 评分与出刊”即可看到每册 32 条虚构记录。
- 示例使用原创几何封面，不含第三方 IP 海报。海报设计工作流另见下一节。

## 真实海报案例：Arthur Morgan

[查看原图与成稿对照](examples/arthur/index.html) · [案例的视觉思路](examples/arthur/PROMPT.md)

运行工作台后，点击顶部“亚瑟：原图 → 海报”，或直接双击 `examples/arthur/index.html`。GitHub 上的 HTML 链接显示源码；在电脑上打开下载的 HTML 才是实际网页。

| 官方参考图 | 生成成稿 |
| --- | --- |
| ![官方举枪姿势参考](examples/arthur/reference.jpg) | ![无五官几何色块海报](examples/arthur/poster.png) |

参考图来自 [Rockstar 官方文章](https://www.rockstargames.com/newswire/article/ak14o883885888/red-dead-redemption-2-recognized-by-the-steam-awards)。成稿使用图像生成工具辅助制作，保留举枪透视，将人物及背景处理为无字、无五官的极简色块。第三方游戏素材和角色不在 MIT 代码许可的授权范围内。

## 从参考到出刊

1. **选择表达内容**：选择喜欢的作品、人物或主题，收集参考。
2. **形成视觉方向**：用极简色块、标志性轮廓、不对称构图和纸张质感组织海报。使用自己喜欢的模型或设计工具实现，再放入工作台。
3. **接入个人档案**：连接评分网站或导入数据，保留来源评分制度，编成可浏览的网站。

项目重点是**创作思路、视觉风格与档案组织方式**。模型、提示词写法和具体制作工具由用户选择，参见 [视觉方向](docs/POSTER-WORKFLOW.md)。当前工作台提供视觉简报和海报接入。

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

- 分册保持独立；评分尺度、0 的含义和整数规则按接入网站配置，AOTY 与 Bangumi 为可选来源预设。
- 搜索、分类、最低评分与未评分筛选、排序、分页。
- 当前筛选的记录数、已评分数量、均分和比例准确的评分分布。
- 表格／封面墙、作品详情与个人短评、CSV 导出、JSON 备份。
- 未评分不计入均分；0 是否为未评分取决于来源语义，保留原始分数，不自动换算。
- 海报保持完整比例，参考图不会出现在生成的网站中。

## 数据格式

支持记录数组，或 `{ "rows": [...] }` / `{ "records": [...] }`。兼容 AOTY 档案常用的 `album/artist/rated` 与 Bangumi 档案常用的 `name_cn/name/category` 字段。

```json
[
  {"id":"demo-1","title":"虚构唱片","creator":"示例作者","rating":85,"year":"2026","date":"2026-01-01","comment":"个人短评"}
]
```

CSV 使用同名字段；标签以 `|` 分隔。可选字段：`cover`（PNG/JPEG/WebP 的 base64 data URL）、`url`（HTTP/HTTPS）、`type`、`status`、`tags`。动画游戏 `category` 用 `anime/game` 或 `2/4`。导入前在“接入来源”选择预设，或填写来源满分及未评分规则。无封面记录可正常显示。参考文件见 [examples/ratings.csv](examples/ratings.csv)。

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
