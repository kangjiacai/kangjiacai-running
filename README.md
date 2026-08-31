# 430 / HEFEI

个人使用的合肥马拉松全马 4:30 备赛计划网页。页面提供十周训练安排、长跑补给建议，以及保存在浏览器本地的训练勾选和备注。

## 本地开发

```bash
npm ci
npm run dev
```

## 构建与发布

```bash
npm run build
```

静态产物位于 `dist/client`。本仓库的 `main` 分支已关联 EdgeOne Makers 生产环境；推送到 `main` 后会自动构建并发布。

本机训练记录使用浏览器 `localStorage` 保存，更新站点不会清除同一浏览器、同一域名下的既有记录。
