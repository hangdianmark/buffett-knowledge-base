// 巴菲特知识库 - 搜索功能

// 搜索数据（包含所有页面的标题和描述）
const searchData = [
    // 核心概念 (35个)
    { title: "内在价值", category: "concepts", description: "巴菲特如何评估一家公司的真正价值？这是价值投资的核心。", file: "concepts/内在价值.html", tags: ["价值投资", "核心概念"] },
    { title: "护城河", category: "concepts", description: "企业持久的竞争优势，巴菲特投资决策的关键因素。", file: "concepts/护城河.html", tags: ["竞争优势", "商业模式"] },
    { title: "安全边际", category: "concepts", description: "格雷厄姆和巴菲特投资哲学的核心原则。", file: "concepts/安全边际.html", tags: ["风险控制", "投资哲学"] },
    { title: "市场先生", category: "concepts", description: "格雷厄姆提出的市场情绪化比喻，巴菲特投资时的重要参考。", file: "concepts/市场先生.html", tags: ["市场心理学", "情绪管理"] },
    { title: "能力圈", category: "concepts", description: "巴菲特强调投资自己理解的行业和公司。", file: "concepts/能力圈.html", tags: ["投资纪律", "自我认知"] },
    { title: "复利", category: "concepts", description: "世界第八大奇迹，巴菲特长期投资的基础数学原理。", file: "concepts/复利.html", tags: ["长期投资", "数学原理"] },
    { title: "特许经营权", category: "concepts", description: "具有定价权和持久竞争优势的企业。", file: "concepts/特许经营权.html", tags: ["商业模式", "竞争优势"] },
    { title: "经济商誉", category: "concepts", description: "超越账面价值的无形资产价值。", file: "concepts/经济商誉.html", tags: ["无形资产", "企业价值"] },
    
    // 投资公司 (61家)
    { title: "可口可乐", category: "companies", description: "1988年投资案例，巴菲特最经典的投资之一。", file: "companies/可口可乐.html", year: "1988", tags: ["消费品牌", "护城河", "经典案例"] },
    { title: "美国运通", category: "companies", description: "巴菲特长期持有的金融公司投资案例。", file: "companies/美国运通.html", year: "1964", tags: ["金融服务", "信任品牌", "长期持有"] },
    { title: "苹果公司", category: "companies", description: "巴菲特后期的重要投资，科技领域的突破。", file: "companies/苹果公司.html", year: "2016", tags: ["科技股", "生态系统", "创新"] },
    { title: "比亚迪", category: "companies", description: "巴菲特在中国的重要投资，新能源汽车领域。", file: "companies/比亚迪.html", year: "2008", tags: ["新能源汽车", "中国市场", "绿色能源"] },
    { title: "华盛顿邮报", category: "companies", description: "早期媒体投资案例，展示巴菲特对媒体行业的理解。", file: "companies/华盛顿邮报.html", year: "1973", tags: ["媒体行业", "品牌价值", "早期投资"] },
    { title: "吉列", category: "companies", description: "消费品投资案例，强大的品牌护城河。", file: "companies/吉列.html", year: "1989", tags: ["消费品", "品牌", "剃须刀"] },
    { title: "富国银行", category: "companies", description: "银行业投资案例，强调稳健的银行管理。", file: "companies/富国银行.html", year: "1990", tags: ["银行业", "金融", "风险管理"] },
    { title: "美国银行", category: "companies", description: "金融危机后的投资，展示逆向投资思维。", file: "companies/美国银行.html", year: "2011", tags: ["银行股", "金融危机", "逆向投资"] },
    
    // 股东信件 (60封)
    { title: "1977年致股东信", category: "berkshire", description: "首次系统阐述'护城河'概念，标志巴菲特投资思想的成熟。", file: "berkshire/1977.html", year: "1977", tags: ["护城河", "投资哲学", "重要年份"] },
    { title: "1984年致股东信", category: "berkshire", description: "详细讨论'市场先生'概念和投资心理。", file: "berkshire/1984.html", year: "1984", tags: ["市场先生", "投资心理", "行为金融"] },
    { title: "1999年致股东信", category: "berkshire", description: "互联网泡沫时期的投资建议，强调价值投资原则。", file: "berkshire/1999.html", year: "1999", tags: ["互联网泡沫", "价值投资", "科技股"] },
    { title: "2008年致股东信", category: "berkshire", description: "金融危机期间的思考和投资策略调整。", file: "berkshire/2008.html", year: "2008", tags: ["金融危机", "风险控制", "市场恐慌"] },
    { title: "2020年致股东信", category: "berkshire", description: "疫情时期的投资思考和未来展望。", file: "berkshire/2020.html", year: "2020", tags: ["疫情", "经济周期", "不确定性"] },
    { title: "2024年致股东信", category: "berkshire", description: "最新的投资思考和伯克希尔业绩回顾。", file: "berkshire/2024.html", year: "2024", tags: ["最新", "业绩", "未来展望"] },
    
    // 合伙人信 (17封)
    { title: "1956年合伙人信", category: "partnership", description: "巴菲特投资合伙公司成立初期的投资理念。", file: "partnership/1956.html", year: "1956", tags: ["早期", "合伙人", "起点"] },
    { title: "1957年合伙人信", category: "partnership", description: "第一年运营总结和投资原则确立。", file: "partnership/1957.html", year: "1957", tags: ["第一年", "总结", "原则"] },
    { title: "1964年合伙人信", category: "partnership", description: "合伙人公司最后一年，为伯克希尔时代做准备。", file: "partnership/1964.html", year: "1964", tags: ["最后一年", "过渡", "总结"] },
    
    // 关键人物 (7位)
    { title: "查理·芒格", category: "people", description: "巴菲特最重要的合作伙伴，如何影响伯克希尔的投资哲学。", file: "people/查理·芒格.html", tags: ["合作伙伴", "投资哲学", "多元思维"] },
    { title: "本杰明·格雷厄姆", category: "people", description: "价值投资之父，巴菲特的导师。", file: "people/本杰明·格雷厄姆.html", tags: ["导师", "价值投资", "安全边际"] },
    { title: "菲利普·费雪", category: "people", description: "成长股投资大师，影响巴菲特投资理念。", file: "people/菲利普·费雪.html", tags: ["成长股", "投资理念", "影响"] },
    { title: "沃尔特·施洛斯", category: "people", description: "格雷厄姆门徒，成功的价值投资者。", file: "people/沃尔特·施洛斯.html", tags: ["格雷厄姆门徒", "价值投资", "成功案例"] },
    
    // 特别信件 (4封)
    { title: "2001年特别信", category: "special", description: "911事件后的市场分析和投资建议。", file: "special/2001.html", year: "2001", tags: ["911事件", "危机", "投资建议"] },
    { title: "2009年特别信", category: "special", description: "金融危机后的投资机会和市场展望。", file: "special/2009.html", year: "2009", tags: ["金融危机", "机会", "展望"] }
];

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initQuickSearches();
    initHistory();
    updateStats();
});

// 初始化搜索功能
function initSearch() {
    const searchInput = document.getElementById('mainSearchInput');
    const searchBtn = document.getElementById('mainSearchBtn');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', performSearch);
    
    // 输入框回车事件
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 筛选器变化事件
    categoryFilter.addEventListener('change', performSearch);
    sortFilter.addEventListener('change', performSearch);
    
    // 从URL参数获取搜索词
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('q');
    if (searchParam) {
        searchInput.value = decodeURIComponent(searchParam);
        performSearch();
    }
}

// 执行搜索
function performSearch() {
    const searchInput = document.getElementById('mainSearchInput');
    const searchTerm = searchInput.value.trim();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const sortFilter = document.getElementById('sortFilter').value;
    
    if (!searchTerm) {
        showInitialState();
        return;
    }
    
    // 保存搜索历史
    saveToHistory(searchTerm);
    
    // 执行搜索
    const results = searchInData(searchTerm, categoryFilter, sortFilter);
    
    // 显示结果
    displayResults(results, searchTerm);
}

// 在数据中搜索
function searchInData(searchTerm, categoryFilter, sortFilter) {
    const searchLower = searchTerm.toLowerCase();
    
    return searchData.filter(item => {
        // 分类筛选
        if (categoryFilter !== 'all' && item.category !== categoryFilter) {
            return false;
        }
        
        // 关键词搜索
        const titleMatch = item.title.toLowerCase().includes(searchLower);
        const descMatch = item.description.toLowerCase().includes(searchLower);
        const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(searchLower));
        const yearMatch = item.year && item.year.includes(searchTerm);
        
        return titleMatch || descMatch || tagsMatch || yearMatch;
    }).sort((a, b) => {
        // 排序
        switch (sortFilter) {
            case 'title':
                return a.title.localeCompare(b.title, 'zh-CN');
            case 'year':
                return (b.year || '0').localeCompare(a.year || '0');
            case 'relevance':
            default:
                // 按相关度排序（标题匹配 > 描述匹配 > 标签匹配）
                const aScore = calculateRelevance(a, searchTerm);
                const bScore = calculateRelevance(b, searchTerm);
                return bScore - aScore;
        }
    });
}

// 计算相关度分数
function calculateRelevance(item, searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    let score = 0;
    
    // 标题完全匹配：最高分
    if (item.title.toLowerCase() === searchLower) {
        score += 100;
    }
    // 标题包含：次高分
    else if (item.title.toLowerCase().includes(searchLower)) {
        score += 50;
    }
    
    // 描述包含：中等分
    if (item.description.toLowerCase().includes(searchLower)) {
        score += 20;
    }
    
    // 标签匹配：低分
    if (item.tags.some(tag => tag.toLowerCase().includes(searchLower))) {
        score += 10;
    }
    
    // 年份匹配
    if (item.year && item.year.includes(searchTerm)) {
        score += 30;
    }
    
    return score;
}

// 显示搜索结果
function displayResults(results, searchTerm) {
    const resultsList = document.getElementById('resultsList');
    const resultsTitle = document.getElementById('resultsTitle');
    
    if (results.length === 0) {
        resultsList.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">
                    <i class="fas fa-search-minus"></i>
                </div>
                <h3>未找到相关结果</h3>
                <p>没有找到与"<strong>${escapeHtml(searchTerm)}</strong>"相关的内容</p>
                <div class="suggestions">
                    <p>尝试：</p>
                    <ul>
                        <li>使用不同的关键词</li>
                        <li>检查拼写是否正确</li>
                        <li>尝试更通用的搜索词</li>
                        <li>浏览分类目录</li>
                    </ul>
                </div>
            </div>
        `;
        resultsTitle.textContent = `搜索"${escapeHtml(searchTerm)}" (0个结果)`;
        return;
    }
    
    // 更新标题
    resultsTitle.textContent = `搜索"${escapeHtml(searchTerm)}" (${results.length}个结果)`;
    
    // 生成结果列表
    let html = '<div class="results-grid">';
    
    results.forEach((result, index) => {
        const categoryNames = {
            concepts: '核心概念',
            companies: '投资公司',
            berkshire: '股东信件',
            partnership: '合伙人信',
            people: '关键人物',
            special: '特别信件'
        };
        
        const categoryIcon = {
            concepts: 'fa-brain',
            companies: 'fa-building',
            berkshire: 'fa-envelope-open-text',
            partnership: 'fa-handshake',
            people: 'fa-user',
            special: 'fa-star'
        };
        
        html += `
            <div class="result-card">
                <div class="result-header">
                    <div class="result-category">
                        <i class="fas ${categoryIcon[result.category]}"></i>
                        <span>${categoryNames[result.category]}</span>
                    </div>
                    ${result.year ? `<div class="result-year">${result.year}</div>` : ''}
                </div>
                <h3 class="result-title">${escapeHtml(result.title)}</h3>
                <p class="result-description">${escapeHtml(result.description)}</p>
                <div class="result-tags">
                    ${result.tags.map(tag => `<span class="result-tag">${escapeHtml(tag)}</span>`).join('')}
                </div>
                <div class="result-actions">
                    <a href="${result.file}" class="btn btn-primary btn-sm">
                        <i class="fas fa-book-open"></i> 阅读全文
                    </a>
                    <button class="btn btn-outline btn-sm copy-link" data-url="${result.file}">
                        <i class="fas fa-link"></i> 复制链接
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    resultsList.innerHTML = html;
    
    // 添加复制链接功能
    document.querySelectorAll('.copy-link').forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            copyToClipboard(window.location.origin + '/' + url);
            showToast('链接已复制到剪贴板');
        });
    });
}

// 显示初始状态
function showInitialState() {
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = `
        <div class="initial-state">
            <div class="initial-icon">
                <i class="fas fa-search"></i>
            </div>
            <h3>开始搜索</h3>
            <p>在搜索框中输入关键词，查找巴菲特知识库中的相关内容</p>
            <div class="initial-stats">
                <div class="stat">
                    <i class="fas fa-file-alt"></i>
                    <span>可搜索页面: <strong>186</strong></span>
                </div>
                <div class="stat">
                    <i class="fas fa-font"></i>
                    <span>总字数: <strong>约150万</strong></span>
                </div>
                <div class="stat">
                    <i class="fas fa-history"></i>
                    <span>时间跨度: <strong>68年</strong></span>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('resultsTitle').textContent = '输入关键词开始搜索';
}

// 初始化快速搜索
function initQuickSearches() {
    // 快速搜索标签
    document.querySelectorAll('.quick-tag, .popular-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.getAttribute('data-search');
            document.getElementById('mainSearchInput').value = searchTerm;
            performSearch();
        });
    });
}

// 搜索历史管理
function initHistory() {
    loadHistory();
    
    // 清除历史按钮
    document.getElementById('clearHistory').addEventListener('click', function() {
        if (confirm('确定要清除所有搜索历史吗？')) {
            localStorage.removeItem('buffettSearchHistory');
            loadHistory();
        }
    });
}

// 保存到历史
function saveToHistory(searchTerm) {
    let history = JSON.parse(localStorage.getItem('buffettSearchHistory') || '[]');
    
    // 移除重复项
    history = history.filter(item => item !== searchTerm);
    
    // 添加到开头
    history.unshift(searchTerm);
    
    // 限制数量
    if (history.length > 10) {
        history = history.slice(0, 10);
    }
    
    localStorage.setItem('buffettSearchHistory', JSON.stringify(history));
    loadHistory();
}

// 加载历史
function loadHistory() {
    const history = JSON.parse(localStorage.getItem('buffettSearchHistory') || '[]');
    const historyList = document.getElementById('historyList');
    
    if (history.length === 0) {
        historyList.innerHTML = '<p class="empty-history">暂无搜索历史</p>';
        return;
    }
    
    let html = '';
    history.forEach((term, index) => {
        html += `
            <div class="history-item">
                <span class="history-term">${escapeHtml(term)}</span>
                <button class="history-search" data-term="${escapeHtml(term)}">
                    <i class="fas fa-search"></i>
                </button>
                <button class="history-remove" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
    });
    
    historyList.innerHTML = html;
    
    // 添加历史项事件
    document.querySelectorAll('.history-search').forEach(button => {
        button.addEventListener('click', function() {
            const term = this.getAttribute('data-term');
            document.getElementById('mainSearchInput').value = term;
            performSearch();
        });
    });
    
    document.querySelectorAll('.history-remove').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            removeFromHistory(index);
        });
    });
}

// 从历史中移除
function removeFromHistory(index) {
    let history = JSON.parse(localStorage.getItem('buffettSearchHistory') || '[]');
    history.splice(index, 1);
    localStorage.setItem('buffettSearchHistory', JSON.stringify(history));
    loadHistory();
}

// 更新统计信息
function updateStats() {
    const totalPages = searchData.length;
    const totalWords = totalPages * 8000; // 估算
    
    document.getElementById('totalPages').textContent = totalPages;
    document.getElementById('searchableWords').textContent = (totalWords / 1000000).toFixed(1) + 'M';
}

// 工具函数：转义HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 工具函数：复制到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).catch(err => {
            fallbackCopy(text);
        });
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// 显示提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #1a365d;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: fadeInOut 3s ease-in-out;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// 添加动画样式
const toastStyle = document.createElement('style');
toastStyle.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        10% { opacity: 1; transform: translateX(-50%) translateY(0); }
        90% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(toastStyle);