# QuantTrade Pro - 专业量化交易平台

![QuantTrade Pro](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20financial%20trading%20platform%20interface%20with%20charts%20and%20data%20tables&image_size=landscape_16_9)

## 项目介绍

QuantTrade Pro 是一个专业的量化交易平台，为投资者提供实时市场数据、交易量排名、自动化交易策略、数据抓取和回测分析等功能。平台采用现代化的Web技术开发，界面美观、响应式设计，支持实时数据刷新和个性化股票关注。

## 功能特点

### 📊 市场概览
- 实时显示上证指数、深证成指、创业板指、恒生指数等主要市场指数
- 自动更新价格和涨跌幅数据
- 直观的卡片式布局，带有动态效果

### ⭐ 我的关注股票
- 支持添加和管理个人关注的股票
- 本地存储保存用户设置
- 实时更新关注股票的价格和交易数据

### 📈 交易量排名
- 展示交易量排名前20的股票
- 支持按今日、本周、本月筛选
- 提供详细的股票分析和买卖建议

### 🔄 实时数据刷新
- 可配置的自动刷新间隔（5秒、10秒、30秒、60秒）
- 手动刷新功能
- 实时通知系统

### 🤖 自动化交易
- 多种交易策略选择（成交量突破、趋势跟随、均值回归）
- 可配置的资金管理和交易条件
- 自动化交易状态监控

### 📡 数据抓取系统
- 支持从多个数据源抓取数据（新浪财经、东方财富、和讯财经、凤凰财经）
- 可配置的抓取频率和数据保存天数
- 抓取状态实时监控

### 📉 行情图表
- 支持多种时间周期（1D、1W、1M、3M、1Y）
- 交互式图表，支持鼠标悬停查看详情
- 专业的技术分析指标

### 🛠️ 策略管理
- 内置多种交易策略
- 支持创建、导入、导出策略
- 策略回测和运行功能

### 🔔 买卖提醒
- 支持设置上证指数的买入和卖出提醒
- 多种提醒方式（网页通知、邮件通知、短信通知）
- 价格监控和实时提醒

### 📋 回测分析
- 支持多种策略的回测
- 详细的回测结果和统计数据
- 资金曲线可视化

## 技术栈

- **前端框架**：原生HTML5、CSS3、JavaScript
- **图表库**：Chart.js
- **数据存储**：LocalStorage
- **响应式设计**：CSS Grid、Flexbox
- **动画效果**：CSS Transitions、Animations

## 快速开始

### 方法1：直接打开

1. 下载项目文件
2. 双击 `index.html` 文件在浏览器中打开

### 方法2：本地服务器（推荐）

1. **克隆项目**
   ```bash
   git clone https://github.com/yourusername/QuantTrade-Pro.git
   cd QuantTrade-Pro
   ```

2. **启动本地服务器**
   - 使用Python 3：
     ```bash
     python -m http.server 8000
     ```
   - 使用Python 2：
     ```bash
     python -m SimpleHTTPServer 8000
     ```
   - 使用Node.js：
     ```bash
     npx http-server -p 8000
     ```

3. **访问平台**
   在浏览器中打开：`http://localhost:8000`

## 使用指南

### 添加关注股票
1. 在「我的关注股票」部分，输入股票代码和名称
2. 点击「添加股票」按钮
3. 股票将被添加到关注列表，并显示实时数据

### 配置自动刷新
1. 在「交易量排名」部分，勾选「启用自动刷新」
2. 选择合适的刷新间隔（5秒、10秒、30秒、60秒）
3. 系统将根据设置自动刷新数据

### 启用自动化交易
1. 在「自动化交易设置」部分，选择交易策略
2. 配置资金管理和交易条件
3. 点击「保存设置」
4. 勾选「启用自动化交易」

### 设置买卖提醒
1. 在「买卖提醒设置」部分，输入买入和卖出价格
2. 选择提醒方式
3. 点击「设置」按钮
4. 当价格达到设定值时，系统将发送提醒

## 项目结构

```
QuantTrade-Pro/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 功能脚本
├── .gitignore          # Git忽略文件
├── README.md           # 项目说明文档
└── QuantTradePro.zip   # 打包文件
```

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 开发说明

### 代码结构

- **HTML**：语义化标签，清晰的结构层次
- **CSS**：模块化设计，响应式布局，现代化样式
- **JavaScript**：模块化函数，事件驱动，异步处理

### 主要函数

- `initAutoRefresh()`：初始化自动刷新功能
- `startAutoRefresh()`：启动自动刷新
- `stopAutoRefresh()`：停止自动刷新
- `updateMarketData()`：更新市场数据
- `generateVolumeRankingData()`：生成交易量排名数据
- `initMyStocks()`：初始化我的关注股票
- `addStock()`：添加关注股票
- `removeStock()`：删除关注股票
- `startAutoTrade()`：启动自动化交易
- `startScraper()`：启动数据抓取

### 数据模拟

由于是前端演示项目，所有数据均为模拟生成：
- 市场指数数据：基于随机波动生成
- 股票数据：基于预设股票列表和随机波动生成
- 交易量排名：基于排名权重和随机波动生成

## 未来规划

- [ ] 接入真实的金融数据API
- [ ] 实现用户账户系统
- [ ] 添加更多技术分析指标
- [ ] 支持更多交易策略
- [ ] 开发移动应用
- [ ] 添加社交分享功能

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

## 联系方式

- 项目地址：[https://github.com/yourusername/QuantTrade-Pro](https://github.com/yourusername/QuantTrade-Pro)
- 邮箱：support@quanttradepro.com

---

**免责声明**：本项目仅作为技术演示使用，不构成任何投资建议。投资有风险，入市需谨慎。

© 2026 QuantTrade Pro. 保留所有权利。
