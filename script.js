// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化图表
    initCharts();
    
    // 绑定事件监听器
    bindEventListeners();
    
    // 初始化市场数据
    initMarketData();
    
    // 初始化我的关注股票
    initMyStocks();
});

// 初始化图表
function initCharts() {
    // 价格图表
    initPriceChart();
    
    // 资金曲线图表
    initEquityChart();
}

// 初始化价格图表
function initPriceChart() {
    const ctx = document.getElementById('priceChart').getContext('2d');
    
    // 生成模拟数据
    const labels = [];
    const prices = [];
    const volumes = [];
    
    const startPrice = 3200;
    let currentPrice = startPrice;
    
    for (let i = 0; i < 24; i++) {
        labels.push(`${i}:00`);
        // 随机价格波动
        const change = (Math.random() - 0.45) * 10;
        currentPrice += change;
        prices.push(currentPrice.toFixed(2));
        // 随机成交量
        volumes.push(Math.floor(Math.random() * 10000000) + 5000000);
    }
    
    // 创建图表
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '上证指数',
                data: prices,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                yAxisID: 'y'
            }, {
                label: '成交量',
                data: volumes,
                borderColor: '#27ae60',
                backgroundColor: 'rgba(39, 174, 96, 0.1)',
                borderWidth: 1,
                fill: true,
                tension: 0.4,
                yAxisID: 'y1',
                hidden: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: '价格'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: '成交量'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                },
                x: {
                    title: {
                        display: true,
                        text: '时间'
                    }
                }
            }
        }
    });
}

// 初始化资金曲线图表
function initEquityChart() {
    const ctx = document.getElementById('equityChart').getContext('2d');
    
    // 生成模拟数据
    const labels = [];
    const equity = [];
    const benchmark = [];
    
    const startEquity = 100000;
    let currentEquity = startEquity;
    let currentBenchmark = startEquity;
    
    for (let i = 0; i < 12; i++) {
        labels.push(`2023-${i+1}`);
        // 策略资金曲线
        const equityChange = (Math.random() - 0.3) * 5000;
        currentEquity += equityChange;
        equity.push(currentEquity);
        // 基准资金曲线
        const benchmarkChange = (Math.random() - 0.4) * 3000;
        currentBenchmark += benchmarkChange;
        benchmark.push(currentBenchmark);
    }
    
    // 创建图表
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: '策略收益',
                data: equity,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }, {
                label: '基准收益',
                data: benchmark,
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 2,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '资金 (CNY)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '¥' + (value / 10000).toFixed(0) + '万';
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '时间'
                    }
                }
            }
        }
    });
}

// 绑定事件监听器
function bindEventListeners() {
    // 导航按钮点击事件
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            navButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');
            
            // 这里可以添加页面切换逻辑
            console.log('切换到页面:', this.textContent);
        });
    });
    
    // 时间范围按钮点击事件
    const timeButtons = document.querySelectorAll('.time-button');
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            timeButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');
            
            // 这里可以添加时间范围切换逻辑
            console.log('切换时间范围:', this.textContent);
        });
    });
    
    // 策略按钮点击事件
    const strategyButtons = document.querySelectorAll('.strategy-button');
    strategyButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('点击策略按钮:', this.textContent);
            // 这里可以添加策略管理逻辑
        });
    });
    
    // 策略操作按钮点击事件
    const actionButtons = document.querySelectorAll('.action-button');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('点击操作按钮:', this.textContent);
            // 这里可以添加操作逻辑
        });
    });
    
    // 回测按钮点击事件
    const backtestButton = document.querySelector('.backtest-button');
    backtestButton.addEventListener('click', function() {
        console.log('开始回测');
        // 这里可以添加回测逻辑
        
        // 模拟回测过程
        this.textContent = '回测中...';
        this.disabled = true;
        
        setTimeout(() => {
            this.textContent = '开始回测';
            this.disabled = false;
            alert('回测完成！');
        }, 2000);
    });
    
    // 登录按钮点击事件
    const loginButton = document.querySelector('.login-button');
    loginButton.addEventListener('click', function() {
        console.log('点击登录按钮');
        // 这里可以添加登录逻辑
        alert('登录功能暂未实现');
    });
    
    // 股票选择事件
    const symbolSelect = document.querySelector('.symbol-select');
    symbolSelect.addEventListener('change', function() {
        console.log('选择股票:', this.value);
        // 这里可以添加股票切换逻辑
    });
    
    // 回测策略选择事件
    const backtestStrategy = document.querySelector('.backtest-strategy');
    backtestStrategy.addEventListener('change', function() {
        console.log('选择回测策略:', this.value);
        // 这里可以添加策略切换逻辑
    });
    
    // 提醒设置事件
    initAlertSystem();
    
    // 交易量排名
    initVolumeRanking();
    
    // 自动化交易系统
    initAutoTradeSystem();
    
    // 数据抓取系统
    initDataScraper();
}

// 初始化交易量排名
function initVolumeRanking() {
    // 生成初始数据
    generateVolumeRankingData();
    
    // 绑定事件监听器
    const refreshButton = document.querySelector('.refresh-ranking');
    refreshButton.addEventListener('click', function() {
        this.textContent = '刷新中...';
        this.disabled = true;
        
        setTimeout(() => {
            generateVolumeRankingData();
            this.textContent = '手动刷新';
            this.disabled = false;
            showNotification('数据已刷新', '交易量排名数据已更新');
        }, 1000);
    });
    
    // 时间周期切换事件
    const periodSelect = document.querySelector('.ranking-period');
    periodSelect.addEventListener('change', function() {
        generateVolumeRankingData(this.value);
        showNotification('时间周期已切换', `显示${this.options[this.selectedIndex].text}交易量排名`);
    });
    
    // 自动刷新设置
    initAutoRefresh();
}

// 初始化自动刷新
function initAutoRefresh() {
    const autoRefreshSwitch = document.getElementById('auto-refresh-switch');
    const refreshInterval = document.getElementById('refresh-interval');
    
    // 加载保存的设置
    loadAutoRefreshSettings();
    
    // 自动刷新开关点击事件
    autoRefreshSwitch.addEventListener('change', function() {
        if (this.checked) {
            startAutoRefresh();
            showNotification('自动刷新已启用', `系统将每${refreshInterval.value}秒自动刷新数据`);
        } else {
            stopAutoRefresh();
            showNotification('自动刷新已禁用', '系统将停止自动刷新数据');
        }
    });
    
    // 刷新间隔变化事件
    refreshInterval.addEventListener('change', function() {
        if (autoRefreshSwitch.checked) {
            stopAutoRefresh();
            startAutoRefresh();
            showNotification('刷新间隔已更新', `系统将每${this.value}秒自动刷新数据`);
        }
    });
}

// 加载自动刷新设置
function loadAutoRefreshSettings() {
    const settings = localStorage.getItem('autoRefreshSettings');
    if (settings) {
        const parsedSettings = JSON.parse(settings);
        document.getElementById('auto-refresh-switch').checked = parsedSettings.enabled || false;
        document.getElementById('refresh-interval').value = parsedSettings.interval || 5;
        
        // 如果启用了自动刷新，启动刷新
        if (parsedSettings.enabled) {
            startAutoRefresh();
        }
    }
}

// 保存自动刷新设置
function saveAutoRefreshSettings() {
    const settings = {
        enabled: document.getElementById('auto-refresh-switch').checked,
        interval: parseInt(document.getElementById('refresh-interval').value)
    };
    localStorage.setItem('autoRefreshSettings', JSON.stringify(settings));
}

// 开始自动刷新
function startAutoRefresh() {
    // 停止现有的自动刷新
    stopAutoRefresh();
    
    // 获取刷新间隔
    const interval = parseInt(document.getElementById('refresh-interval').value) * 1000;
    
    // 启动自动刷新
    autoRefreshInterval = setInterval(() => {
        // 获取当前选中的时间周期
        const period = document.querySelector('.ranking-period').value;
        generateVolumeRankingData(period);
        
        // 更新市场数据
        updateMarketData();
        
        // 更新价格图表
        updatePriceChart();
    }, interval);
    
    // 保存设置
    saveAutoRefreshSettings();
}

// 停止自动刷新
function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
    
    // 保存设置
    saveAutoRefreshSettings();
}

// 更新市场数据
function updateMarketData() {
    const marketCards = document.querySelectorAll('.market-card');
    marketCards.forEach(card => {
        const priceElement = card.querySelector('.market-price');
        const changeElement = card.querySelector('.market-change');
        
        if (priceElement && changeElement) {
            // 解析当前价格
            let currentPrice = parseFloat(priceElement.textContent.replace(',', ''));
            // 随机价格波动
            const change = (Math.random() * 0.02 - 0.01) * currentPrice;
            const newPrice = currentPrice + change;
            // 计算涨跌幅
            const changePercent = (change / currentPrice * 100).toFixed(2);
            
            // 更新价格
            priceElement.textContent = newPrice.toLocaleString('zh-CN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
            
            // 更新涨跌幅
            if (change >= 0) {
                changeElement.textContent = `+${changePercent}%`;
                changeElement.className = 'market-change positive';
            } else {
                changeElement.textContent = `${changePercent}%`;
                changeElement.className = 'market-change negative';
            }
        }
    });
}

// 更新价格图表
function updatePriceChart() {
    // 这里可以添加更新价格图表的逻辑
    // 由于我们使用的是模拟数据，这里暂时不实现
}

// 生成交易量排名数据
function generateVolumeRankingData(period = 'day') {
    const rankingBody = document.getElementById('volume-ranking-body');
    rankingBody.innerHTML = '';
    
    // 模拟股票数据 - 基于真实A股市场的权重股
    const stocks = [
        { name: '贵州茅台', code: '600519', basePrice: 1800, sector: '白酒' },
        { name: '中国平安', code: '601318', basePrice: 45, sector: '保险' },
        { name: '招商银行', code: '600036', basePrice: 40, sector: '银行' },
        { name: '宁德时代', code: '300750', basePrice: 250, sector: '新能源' },
        { name: '五粮液', code: '000858', basePrice: 160, sector: '白酒' },
        { name: '比亚迪', code: '002594', basePrice: 240, sector: '新能源汽车' },
        { name: '泸州老窖', code: '000568', basePrice: 180, sector: '白酒' },
        { name: '长江电力', code: '600900', basePrice: 22, sector: '电力' },
        { name: '美的集团', code: '000333', basePrice: 55, sector: '家电' },
        { name: '药明康德', code: '603259', basePrice: 85, sector: '医药' },
        { name: '中国中免', code: '601888', basePrice: 180, sector: '免税' },
        { name: '隆基绿能', code: '601012', basePrice: 35, sector: '新能源' },
        { name: '工商银行', code: '601398', basePrice: 5, sector: '银行' },
        { name: '建设银行', code: '601939', basePrice: 6, sector: '银行' },
        { name: '中国神华', code: '601088', basePrice: 30, sector: '煤炭' },
        { name: '中国石油', code: '601857', basePrice: 7, sector: '石油' },
        { name: '中国石化', code: '600028', basePrice: 5, sector: '石油' },
        { name: '中国人寿', code: '601628', basePrice: 30, sector: '保险' },
        { name: '中国建筑', code: '601668', basePrice: 6, sector: '建筑' },
        { name: '中国中铁', code: '601390', basePrice: 8, sector: '建筑' }
    ];
    
    // 根据时间周期调整成交量
    let volumeMultiplier = 1;
    if (period === 'week') {
        volumeMultiplier = 5;
    } else if (period === 'month') {
        volumeMultiplier = 20;
    }
    
    // 生成排名数据
    for (let i = 0; i < 20; i++) {
        const stock = stocks[i];
        const rank = i + 1;
        
        // 生成基于基础价格的随机价格波动 (±5%)
        const priceChange = (Math.random() * 0.1 - 0.05);
        const price = (stock.basePrice * (1 + priceChange)).toFixed(2);
        
        // 计算涨跌幅
        const change = (priceChange * 100).toFixed(2);
        
        // 基于排名生成成交量 (排名越高，成交量越大)
        const baseVolume = (20 - i) * 50;
        const volume = (baseVolume * volumeMultiplier * (Math.random() * 0.4 + 0.8)).toFixed(2);
        
        // 计算成交额
        const amount = (volume * 10000 * parseFloat(price) / 100000000).toFixed(2);
        
        // 基于成交量、涨跌幅等指标生成买卖建议
        const analysis = analyzeStock(stock, parseFloat(price), parseFloat(change), parseFloat(volume), period);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${rank}</td>
            <td>${stock.name}</td>
            <td>${stock.code}</td>
            <td>${price}</td>
            <td class="${parseFloat(change) >= 0 ? 'positive' : 'negative'}">${parseFloat(change) >= 0 ? '+' : ''}${change}%</td>
            <td>${volume}</td>
            <td>${amount}</td>
            <td>
                <div class="suggestion ${analysis.suggestion === '买入' ? 'buy' : analysis.suggestion === '卖出' ? 'sell' : 'hold'}">
                    <strong>${analysis.suggestion}</strong>
                    <div class="analysis-basis">${analysis.basis}</div>
                </div>
            </td>
            <td>
                <button class="action-button" onclick="addStockAlert('${stock.name}', '${stock.code}')">设置提醒</button>
                <button class="action-button" onclick="viewStockDetail('${stock.name}', '${stock.code}')">查看详情</button>
            </td>
        `;
        
        rankingBody.appendChild(row);
    }
}

// 分析股票并生成买卖建议
function analyzeStock(stock, price, change, volume, period) {
    let suggestion = '观望';
    let basis = '';
    
    // 基于成交量分析
    const volumeThreshold = period === 'day' ? 500 : period === 'week' ? 2000 : 8000;
    const highVolume = volume > volumeThreshold;
    
    // 基于涨跌幅分析
    const strongRise = change > 3;
    const strongFall = change < -3;
    const moderateRise = change > 0 && change <= 3;
    const moderateFall = change < 0 && change >= -3;
    
    // 基于价格位置分析
    const pricePercentile = (price - stock.basePrice * 0.8) / (stock.basePrice * 0.4); // 0-1之间
    
    // 综合分析
    if (highVolume && strongFall && pricePercentile < 0.3) {
        suggestion = '买入';
        basis = `成交量放大(${volume.toFixed(0)}万手)，股价大幅回调(${change.toFixed(2)}%)，当前价格处于相对低位，逢低布局机会。`;
    } else if (highVolume && strongRise && pricePercentile > 0.7) {
        suggestion = '卖出';
        basis = `成交量放大(${volume.toFixed(0)}万手)，股价大幅上涨(${change.toFixed(2)}%)，当前价格处于相对高位，可能见顶。`;
    } else if (highVolume && moderateRise) {
        suggestion = '买入';
        basis = `成交量放大(${volume.toFixed(0)}万手)，股价温和上涨(${change.toFixed(2)}%)，量价配合良好，有望继续上涨。`;
    } else if (highVolume && moderateFall) {
        suggestion = '观望';
        basis = `成交量放大(${volume.toFixed(0)}万手)，股价温和下跌(${change.toFixed(2)}%)，需观察后续走势。`;
    } else if (strongRise && pricePercentile > 0.8) {
        suggestion = '卖出';
        basis = `股价大幅上涨(${change.toFixed(2)}%)，当前价格处于历史高位，可能存在回调风险。`;
    } else if (strongFall && pricePercentile < 0.2) {
        suggestion = '买入';
        basis = `股价大幅下跌(${change.toFixed(2)}%)，当前价格处于历史低位，可能超跌反弹。`;
    } else if (moderateRise) {
        suggestion = '观望';
        basis = `股价温和上涨(${change.toFixed(2)}%)，走势稳定，可继续观察。`;
    } else if (moderateFall) {
        suggestion = '观望';
        basis = `股价温和下跌(${change.toFixed(2)}%)，走势正常，可继续观察。`;
    } else {
        suggestion = '观望';
        basis = `股价波动较小(${change.toFixed(2)}%)，成交量一般(${volume.toFixed(0)}万手)，暂无明显交易机会。`;
    }
    
    // 加入行业分析
    if (stock.sector === '白酒' && pricePercentile < 0.4) {
        basis += ` ${stock.sector}行业具有较强的抗周期性，当前估值合理。`;
    } else if (stock.sector === '新能源' && strongRise) {
        basis += ` ${stock.sector}行业景气度高，政策支持力度大。`;
    } else if (stock.sector === '银行' && pricePercentile < 0.3) {
        basis += ` ${stock.sector}行业估值处于历史低位，安全边际较高。`;
    }
    
    return { suggestion, basis };
}

// 添加股票提醒
function addStockAlert(stockName, stockCode) {
    showNotification('设置提醒', `为${stockName}(${stockCode})设置价格提醒`);
    // 这里可以添加具体的提醒设置逻辑
}

// 查看股票详情
function viewStockDetail(stockName, stockCode) {
    showNotification('查看详情', `查看${stockName}(${stockCode})的详细信息`);
    // 这里可以添加查看详情的逻辑
}

// 初始化自动化交易系统
function initAutoTradeSystem() {
    // 自动化交易开关
    const autoTradeSwitch = document.getElementById('auto-trade-switch');
    const autoTradeStatus = document.getElementById('auto-trade-status');
    const currentPosition = document.getElementById('current-position');
    const todayTrades = document.getElementById('today-trades');
    
    // 加载保存的设置
    loadAutoTradeSettings();
    
    // 自动化交易开关点击事件
    autoTradeSwitch.addEventListener('change', function() {
        if (this.checked) {
            autoTradeStatus.textContent = '运行中';
            autoTradeStatus.style.color = '#27ae60';
            startAutoTrade();
            showNotification('自动化交易已启用', '系统将根据设置自动执行交易');
        } else {
            autoTradeStatus.textContent = '未启用';
            autoTradeStatus.style.color = '#7f8c8d';
            stopAutoTrade();
            showNotification('自动化交易已禁用', '系统将停止自动执行交易');
        }
    });
    
    // 保存设置按钮点击事件
    const saveAutoTradeButton = document.querySelector('.save-auto-trade');
    saveAutoTradeButton.addEventListener('click', function() {
        saveAutoTradeSettings();
        showNotification('自动化交易设置已保存', '新的设置将在下次交易中生效');
    });
}

// 加载自动化交易设置
function loadAutoTradeSettings() {
    const settings = localStorage.getItem('autoTradeSettings');
    if (settings) {
        const parsedSettings = JSON.parse(settings);
        document.getElementById('auto-trade-strategy').value = parsedSettings.strategy || 'volume-breakout';
        document.getElementById('trade-amount').value = parsedSettings.tradeAmount || 10;
        document.getElementById('max-position').value = parsedSettings.maxPosition || 30;
        document.getElementById('min-change').value = parsedSettings.minChange || 2;
        document.getElementById('min-volume').value = parsedSettings.minVolume || 100;
    }
}

// 保存自动化交易设置
function saveAutoTradeSettings() {
    const settings = {
        strategy: document.getElementById('auto-trade-strategy').value,
        tradeAmount: parseFloat(document.getElementById('trade-amount').value),
        maxPosition: parseFloat(document.getElementById('max-position').value),
        minChange: parseFloat(document.getElementById('min-change').value),
        minVolume: parseFloat(document.getElementById('min-volume').value)
    };
    localStorage.setItem('autoTradeSettings', JSON.stringify(settings));
}

// 开始自动化交易
function startAutoTrade() {
    // 模拟自动化交易执行
    autoTradeInterval = setInterval(() => {
        executeAutoTrade();
    }, 30000); // 每30秒执行一次
}

// 停止自动化交易
function stopAutoTrade() {
    if (autoTradeInterval) {
        clearInterval(autoTradeInterval);
        autoTradeInterval = null;
    }
}

// 执行自动化交易
function executeAutoTrade() {
    // 获取自动化交易设置
    const settings = localStorage.getItem('autoTradeSettings');
    if (!settings) return;
    
    const parsedSettings = JSON.parse(settings);
    
    // 模拟交易执行
    const stockNames = [
        '贵州茅台', '中国平安', '招商银行', '宁德时代', '五粮液'
    ];
    
    // 随机选择一只股票进行交易
    const randomIndex = Math.floor(Math.random() * stockNames.length);
    const stockName = stockNames[randomIndex];
    const action = Math.random() > 0.5 ? '买入' : '卖出';
    const price = (Math.random() * 100 + 10).toFixed(2);
    const amount = parsedSettings.tradeAmount;
    
    // 更新交易状态
    const todayTradesElement = document.getElementById('today-trades');
    const currentPositionElement = document.getElementById('current-position');
    
    // 模拟交易成功
    showNotification('自动化交易执行', `${action} ${stockName}，价格：${price}元，金额：${amount}万元`);
    
    // 更新交易统计
    const currentTrades = parseInt(todayTradesElement.textContent) || 0;
    todayTradesElement.textContent = (currentTrades + 1) + ' 笔';
    
    const positionCount = Math.floor(Math.random() * 5) + 1;
    currentPositionElement.textContent = positionCount + ' 只股票';
}

// 初始化数据抓取系统
function initDataScraper() {
    const startScraperBtn = document.querySelector('.start-scraper');
    const stopScraperBtn = document.querySelector('.stop-scraper');
    const testScraperBtn = document.querySelector('.test-scraper');
    const scraperStatus = document.getElementById('scraper-status');
    const lastScrape = document.getElementById('last-scrape');
    const scrapeCount = document.getElementById('scrape-count');
    
    // 开始抓取按钮点击事件
    startScraperBtn.addEventListener('click', function() {
        startScraper();
        scraperStatus.textContent = '运行中';
        scraperStatus.style.color = '#27ae60';
        startScraperBtn.disabled = true;
        stopScraperBtn.disabled = false;
        showNotification('数据抓取已启动', '系统将从选定的数据源抓取股票数据');
    });
    
    // 停止抓取按钮点击事件
    stopScraperBtn.addEventListener('click', function() {
        stopScraper();
        scraperStatus.textContent = '未启动';
        scraperStatus.style.color = '#7f8c8d';
        startScraperBtn.disabled = false;
        stopScraperBtn.disabled = true;
        showNotification('数据抓取已停止', '系统将停止从数据源抓取股票数据');
    });
    
    // 测试抓取按钮点击事件
    testScraperBtn.addEventListener('click', function() {
        testScraper();
    });
}

// 开始数据抓取
function startScraper() {
    const interval = parseInt(document.getElementById('scrape-interval').value) * 60000;
    scraperInterval = setInterval(() => {
        scrapeData();
    }, interval);
}

// 停止数据抓取
function stopScraper() {
    if (scraperInterval) {
        clearInterval(scraperInterval);
        scraperInterval = null;
    }
}

// 测试数据抓取
function testScraper() {
    showNotification('测试数据抓取', '正在测试从数据源抓取数据...');
    
    // 模拟抓取过程
    setTimeout(() => {
        const sources = [];
        document.querySelectorAll('.source-checkbox:checked').forEach(checkbox => {
            sources.push(checkbox.value);
        });
        
        if (sources.length > 0) {
            showNotification('测试抓取成功', `从 ${sources.length} 个数据源获取了股票数据`);
        } else {
            showNotification('测试抓取失败', '请至少选择一个数据源');
        }
    }, 2000);
}

// 抓取数据
function scrapeData() {
    const sources = [];
    document.querySelectorAll('.source-checkbox:checked').forEach(checkbox => {
        sources.push(checkbox.value);
    });
    
    if (sources.length === 0) return;
    
    // 模拟从不同数据源抓取数据
    const sourceNames = {
        'sina': '新浪财经',
        'eastmoney': '东方财富',
        'hexun': '和讯财经',
        'ifeng': '凤凰财经'
    };
    
    // 随机选择一个数据源进行模拟抓取
    const randomSource = sources[Math.floor(Math.random() * sources.length)];
    const sourceName = sourceNames[randomSource];
    
    // 更新抓取状态
    const lastScrape = document.getElementById('last-scrape');
    const scrapeCount = document.getElementById('scrape-count');
    
    // 模拟抓取成功
    showNotification('数据抓取完成', `从 ${sourceName} 获取了最新股票数据`);
    
    // 更新抓取统计
    lastScrape.textContent = new Date().toLocaleString();
    const currentCount = parseInt(scrapeCount.textContent) || 0;
    scrapeCount.textContent = currentCount + 1;
}

// 初始化提醒系统
function initAlertSystem() {
    // 买入提醒按钮
    const buyAlertButton = document.querySelector('#buy-alert + .alert-button');
    buyAlertButton.addEventListener('click', function() {
        const buyPrice = parseFloat(document.getElementById('buy-alert').value);
        if (!isNaN(buyPrice)) {
            localStorage.setItem('buyAlert', buyPrice);
            showNotification('买入提醒已设置', `当上证指数低于 ${buyPrice} 时会提醒您`);
            console.log('设置买入提醒:', buyPrice);
        } else {
            alert('请输入有效的价格');
        }
    });
    
    // 卖出提醒按钮
    const sellAlertButton = document.querySelector('#sell-alert + .alert-button');
    sellAlertButton.addEventListener('click', function() {
        const sellPrice = parseFloat(document.getElementById('sell-alert').value);
        if (!isNaN(sellPrice)) {
            localStorage.setItem('sellAlert', sellPrice);
            showNotification('卖出提醒已设置', `当上证指数高于 ${sellPrice} 时会提醒您`);
            console.log('设置卖出提醒:', sellPrice);
        } else {
            alert('请输入有效的价格');
        }
    });
    
    // 保存提醒设置按钮
    const saveAlertButton = document.querySelector('.save-alert-button');
    saveAlertButton.addEventListener('click', function() {
        const alertMethods = [];
        document.querySelectorAll('.alert-checkbox:checked').forEach(checkbox => {
            alertMethods.push(checkbox.nextSibling.textContent.trim());
        });
        localStorage.setItem('alertMethods', JSON.stringify(alertMethods));
        showNotification('提醒设置已保存', `选择的提醒方式: ${alertMethods.join(', ')}`);
        console.log('保存提醒设置:', alertMethods);
    });
    
    // 加载保存的提醒设置
    loadAlertSettings();
    
    // 启动价格监控
    startPriceMonitoring();
}

// 加载保存的提醒设置
function loadAlertSettings() {
    const buyAlert = localStorage.getItem('buyAlert');
    const sellAlert = localStorage.getItem('sellAlert');
    const alertMethods = localStorage.getItem('alertMethods');
    
    if (buyAlert) {
        document.getElementById('buy-alert').value = buyAlert;
    }
    
    if (sellAlert) {
        document.getElementById('sell-alert').value = sellAlert;
    }
    
    if (alertMethods) {
        const methods = JSON.parse(alertMethods);
        document.querySelectorAll('.alert-checkbox').forEach(checkbox => {
            const method = checkbox.nextSibling.textContent.trim();
            checkbox.checked = methods.includes(method);
        });
    }
}

// 启动价格监控
function startPriceMonitoring() {
    setInterval(() => {
        // 获取当前上证指数价格
        const marketCard = document.querySelector('.market-card h3:nth-child(1)').parentElement;
        const priceElement = marketCard.querySelector('.market-price');
        if (priceElement) {
            const currentPrice = parseFloat(priceElement.textContent.replace(',', ''));
            
            // 检查买入提醒
            const buyAlert = parseFloat(localStorage.getItem('buyAlert'));
            if (!isNaN(buyAlert) && currentPrice <= buyAlert) {
                showNotification('买入提醒', `上证指数当前价格 ${currentPrice} 低于设置的买入价格 ${buyAlert}，建议考虑买入！`);
                // 清除提醒，避免重复通知
                localStorage.removeItem('buyAlert');
                document.getElementById('buy-alert').value = '';
            }
            
            // 检查卖出提醒
            const sellAlert = parseFloat(localStorage.getItem('sellAlert'));
            if (!isNaN(sellAlert) && currentPrice >= sellAlert) {
                showNotification('卖出提醒', `上证指数当前价格 ${currentPrice} 高于设置的卖出价格 ${sellAlert}，建议考虑卖出！`);
                // 清除提醒，避免重复通知
                localStorage.removeItem('sellAlert');
                document.getElementById('sell-alert').value = '';
            }
        }
    }, 10000); // 每10秒检查一次
}

// 显示通知
function showNotification(title, message) {
    // 检查浏览器是否支持通知
    if ('Notification' in window) {
        // 请求通知权限
        if (Notification.permission === 'granted') {
            new Notification(title, {
                body: message,
                icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=financial%20notification%20icon&image_size=square'
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    new Notification(title, {
                        body: message,
                        icon: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=financial%20notification%20icon&image_size=square'
                    });
                }
            });
        }
    }
    
    // 在网页中显示通知
    const notification = document.createElement('div');
    notification.className = 'web-notification';
    notification.innerHTML = `
        <h4>${title}</h4>
        <p>${message}</p>
        <button class="close-notification">关闭</button>
    `;
    
    document.body.appendChild(notification);
    
    // 添加关闭按钮事件
    notification.querySelector('.close-notification').addEventListener('click', function() {
        notification.remove();
    });
    
    // 自动关闭通知
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// 初始化市场数据
function initMarketData() {
    // 模拟市场数据更新
    setInterval(() => {
        const marketCards = document.querySelectorAll('.market-card');
        marketCards.forEach(card => {
            const priceElement = card.querySelector('.market-price');
            const changeElement = card.querySelector('.market-change');
            
            if (priceElement && changeElement) {
                // 解析当前价格
                let currentPrice = parseFloat(priceElement.textContent.replace(',', ''));
                // 随机价格波动
                const change = (Math.random() - 0.45) * currentPrice * 0.01;
                const newPrice = currentPrice + change;
                // 计算涨跌幅
                const changePercent = (change / currentPrice * 100).toFixed(2);
                
                // 更新价格
                priceElement.textContent = newPrice.toLocaleString('zh-CN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                });
                
                // 更新涨跌幅
                if (change >= 0) {
                    changeElement.textContent = `+${changePercent}%`;
                    changeElement.className = 'market-change positive';
                } else {
                    changeElement.textContent = `${changePercent}%`;
                    changeElement.className = 'market-change negative';
                }
            }
        });
    }, 5000); // 每5秒更新一次
}

// 辅助函数：生成随机颜色
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// 辅助函数：格式化数字为货币格式
function formatCurrency(value) {
    return new Intl.NumberFormat('zh-CN', {
        style: 'currency',
        currency: 'CNY'
    }).format(value);
}

// 辅助函数：格式化数字为百分比格式
function formatPercent(value) {
    return value.toFixed(2) + '%';
}

// 初始化我的关注股票
function initMyStocks() {
    // 加载保存的股票
    loadMyStocks();
    
    // 绑定添加股票按钮事件
    const addStockButton = document.querySelector('.add-stock-button');
    addStockButton.addEventListener('click', addStock);
    
    // 绑定回车键事件
    const stockCodeInput = document.getElementById('stock-code');
    const stockNameInput = document.getElementById('stock-name');
    
    stockCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addStock();
        }
    });
    
    stockNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addStock();
        }
    });
}

// 添加股票
function addStock() {
    const stockCode = document.getElementById('stock-code').value.trim();
    const stockName = document.getElementById('stock-name').value.trim();
    
    if (!stockCode || !stockName) {
        showNotification('添加失败', '请输入股票代码和名称');
        return;
    }
    
    // 检查是否已存在
    const existingStock = myStocks.find(stock => stock.code === stockCode);
    if (existingStock) {
        showNotification('添加失败', '该股票已在关注列表中');
        return;
    }
    
    // 生成模拟数据
    const stockData = generateStockData(stockName, stockCode);
    
    // 添加到数组
    myStocks.push(stockData);
    
    // 保存到本地存储
    saveMyStocks();
    
    // 渲染列表
    renderMyStocks();
    
    // 清空输入框
    document.getElementById('stock-code').value = '';
    document.getElementById('stock-name').value = '';
    
    showNotification('添加成功', `已添加 ${stockName} (${stockCode}) 到关注列表`);
}

// 删除股票
function removeStock(code) {
    myStocks = myStocks.filter(stock => stock.code !== code);
    saveMyStocks();
    renderMyStocks();
    showNotification('删除成功', '已从关注列表中删除股票');
}

// 加载我的关注股票
function loadMyStocks() {
    const savedStocks = localStorage.getItem('myStocks');
    if (savedStocks) {
        myStocks = JSON.parse(savedStocks);
    } else {
        // 添加默认股票
        myStocks = [
            generateStockData('贵州茅台', '600519'),
            generateStockData('中国平安', '601318'),
            generateStockData('招商银行', '600036')
        ];
        saveMyStocks();
    }
    renderMyStocks();
}

// 保存我的关注股票
function saveMyStocks() {
    localStorage.setItem('myStocks', JSON.stringify(myStocks));
}

// 渲染我的关注股票
function renderMyStocks() {
    const tbody = document.getElementById('my-stocks-body');
    tbody.innerHTML = '';
    
    myStocks.forEach(stock => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${stock.name}</td>
            <td>${stock.code}</td>
            <td>${stock.price}</td>
            <td class="${parseFloat(stock.change) >= 0 ? 'positive' : 'negative'}">
                ${parseFloat(stock.change) >= 0 ? '+' : ''}${stock.change}%
            </td>
            <td>${stock.volume}</td>
            <td>
                <button class="action-button" onclick="removeStock('${stock.code}')">删除</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// 生成模拟股票数据
function generateStockData(name, code) {
    // 生成随机价格 (10-300之间)
    const price = (Math.random() * 290 + 10).toFixed(2);
    // 生成随机涨跌幅 (-5% 到 5%之间)
    const change = (Math.random() * 10 - 5).toFixed(2);
    // 生成随机成交量 (10-1000之间)
    const volume = (Math.random() * 990 + 10).toFixed(2);
    
    return {
        name: name,
        code: code,
        price: price,
        change: change,
        volume: volume
    };
}

// 我的关注股票数组
let myStocks = [];