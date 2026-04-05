/**
 * 巴菲特知识库 - 导航功能脚本
 */

/**
 * 展开/收起侧边栏导航分组
 */
function toggle(id) {
    var el = document.getElementById(id);
    if (!el) return;
    
    // 切换 .open 类
    el.classList.toggle('open');
    
    // 同时更新父标题的 open 状态
    var title = el.previousElementSibling;
    if (title && title.classList.contains('nav-group-title')) {
        title.classList.toggle('open');
    }
}

/**
 * 初始化侧边栏
 */
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有分组为收起状态
    document.querySelectorAll('.nav-group-items').forEach(function(el) {
        el.classList.remove('open');
    });
    
    // 初始化所有分组标题
    document.querySelectorAll('.nav-group-title').forEach(function(el) {
        el.classList.remove('open');
    });
    
    // 高亮当前页面链接
    var currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(function(link) {
        var href = link.getAttribute('href');
        if (href && currentPath.endsWith(href)) {
            link.classList.add('active');
        }
    });
    
    // 自动展开当前分组
    var activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        var group = activeLink.closest('.nav-group-items');
        if (group) {
            group.classList.add('open');
            var title = group.previousElementSibling;
            if (title && title.classList.contains('nav-group-title')) {
                title.classList.add('open');
            }
        }
    }
    
    // 键盘可访问性
    document.querySelectorAll('.nav-group-title').forEach(function(el) {
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                var id = this.getAttribute('onclick');
                if (id) {
                    var match = id.match(/toggle\('([^']+)'\)/);
                    if (match) toggle(match[1]);
                }
            }
        });
    });
});
