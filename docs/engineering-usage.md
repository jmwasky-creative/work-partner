# Work Partner 工程使用方法

## 1. 项目简介

Work Partner 是一个基于浏览器运行的学习成长 MVP，技术栈如下：

- Vite
- React
- TypeScript
- React Router
- Dexie
- Vitest
- Testing Library

应用当前采用本地 IndexedDB 存储，并提供 JSON 导入导出能力。

## 2. 环境要求

建议环境：

- Node.js 20+
- npm 10+
- Windows / macOS / Linux 均可

## 3. 启动命令

安装依赖：

```bash
npm install
```

启动开发环境：

```bash
npm run dev
```

按当前本地联调方式指定 Vite 主机：

```bash
npm run dev -- --host 127.0.0.1
```

运行测试：

```bash
npm test
```

构建生产包：

```bash
npm run build
```

## 4. 当前页面说明

### 4.1 成长看板

文件：

- `src/pages/dashboard-page.tsx`

功能：

- 显示宠物成长摘要
- 显示愿望事件说明
- 提供导入导出存档入口
- 在空数据场景下注入演示快照

### 4.2 任务页

文件：

- `src/pages/tasks-page.tsx`

功能：

- 显示演示任务
- 完成任务并更新页面状态

### 4.3 目标页

文件：

- `src/pages/goals-page.tsx`

功能：

- 创建目标
- 展示目标列表

### 4.4 宠物页

文件：

- `src/pages/pet-page.tsx`

功能：

- 显示宠物状态
- 模拟未完成任务数
- 触发愿望逻辑
- 保留奖励到后续进化

### 4.5 反馈页

文件：

- `src/pages/feedback-page.tsx`

功能：

- 填写讲解反馈
- 展示反馈记录
- 展示特殊奖励

## 5. 目录结构

```text
src/
  app/                应用壳、路由、入口测试
  data/               Dexie 数据层、快照、导入导出、仓库
  domain/             领域模型、常量、种子数据、任务生成
  features/           页面级功能组件与业务逻辑
  pages/              路由页面
  styles/             全局样式
  test/               测试初始化
docs/
  plans/              设计与实施文档
```

## 6. 数据与状态说明

### 6.1 持久化

持久化入口主要位于：

- `src/data/repositories/app-repository.ts`
- `src/data/import-export.ts`
- `src/data/db.ts`

当前快照结构定义在：

- `src/data/app-snapshot.ts`

### 6.2 演示数据

演示数据位于：

- `src/domain/seed-data.ts`

当本地数据库为空时，成长看板会自动注入演示快照。

## 7. 测试方法

### 7.1 全量测试

```bash
npm test
```

### 7.2 指定文件测试

```bash
npm test -- src/pages/tasks-page.test.tsx
```

### 7.3 当前测试覆盖重点

- 导航渲染
- 目标创建
- 任务完成
- 宠物愿望与保留奖励
- 反馈奖励
- 仓库层存取
- 导入导出
- 演示种子
- 成长看板烟雾测试

## 8. 开发约定

### 8.1 文案约定

- 所有用户可见 UI 文案默认使用中文
- 内部代码标识可以继续使用英文

### 8.2 状态约定

- 页面局部状态只适合临时演示
- 真正业务状态应逐步收敛到统一 `AppSnapshot`

### 8.3 测试约定

- 新增功能优先走 TDD
- 先写失败测试，再补最小实现
- 修改用户可见文案时同步更新断言

## 9. 常见开发任务

### 9.1 新增页面文案

建议步骤：

1. 先更新相关测试
2. 再更新页面组件
3. 跑目标测试
4. 最后跑全量测试

### 9.2 修改演示数据

优先修改：

- `src/domain/seed-data.ts`

如果页面初始示例数据单独存在，也要同步修改对应页面文件。

### 9.3 修改持久化结构

建议同步检查：

- `src/data/app-snapshot.ts`
- `src/data/db.ts`
- `src/data/repositories/app-repository.ts`
- `src/data/import-export.ts`
- 相关测试

## 10. 当前已知限制

- 页面之间尚未完全共享统一业务状态
- 多数核心链路仍偏演示性质
- 手动浏览器回放测试仍需要继续补强
- 现有部分旧设计文档存在编码问题，后续建议逐步替换

## 11. 推荐协作方式

如果后续继续开发，建议优先按以下节奏推进：

1. 先补设计或计划文档
2. 再按 TDD 实现
3. 每完成一个链路就跑测试与构建
4. 最后更新 README 和工程文档
