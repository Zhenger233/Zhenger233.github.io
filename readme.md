# 极简博客

一个无需构建、纯前端的个人博客。文章使用纯文本（.txt）存放在 posts/ 目录，推送到 GitHub 后，页面会自动通过 GitHub API 加载并展示。

## 使用方法

- 建立目录：在仓库根目录下使用 posts/ 存放文章。
- 命名规范：建议 `YYYY-MM-DD-标题.txt`，例如 `2025-12-15-welcome.txt`。
- 写作格式：全文纯文本即可，换行会自动保留；第一行可作为标题（可选）。
- 推送更新：提交并推送后，GitHub Pages 页面会自动读取最新列表。

## 部署 GitHub Pages

对于用户主页仓库（例如 `用户名.github.io`）：
- 将代码推送到默认分支（通常为 `main`），GitHub 会自动发布。

对于项目页（任意仓库）：
- 在仓库的 Settings → Pages 中，选择 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`。

## 可选配置

如默认分支不是 `main`，或仓库名不是 `用户名.github.io`（仅限非用户主页用法），可在 [index.html](index.html) 顶部脚本里调整：
- `CONFIG.branch`：默认 `main`
- `CONFIG.owner` 与 `CONFIG.repo`：在非 `*.github.io` 域名预览时用作回退配置

## 故障排查

- 页面没有文章：确认 `posts/` 目录存在且至少有一个 `.txt` 文件，并已推送到远端；稍等几十秒再刷新。
- 列表能看到但点开失败：检查文件是否是纯文本（编码 UTF-8）以及网络请求是否被浏览器插件拦截。
- 访问频率受限：GitHub 未登录访问有速率限制（约 60 次/小时/公网 IP），稍后再试即可。

## 目录结构示例

```
.
├─ index.html        # 页面与样式、脚本（已内联）
├─ posts/
│  ├─ 2025-12-15-welcome.txt
│  └─ ...            # 你的其它 .txt 文章
└─ readme.md
```

完成后访问你的 Pages 页面（例如 `https://用户名.github.io/`），左侧为文章列表，点击即可阅读，无需额外构建步骤。