/**
 * 巴菲特知识库 - 导航功能脚本
 */

/**
 * 展开/收起侧边栏导航分组
 * @param {string} id - 要切换的分组元素ID
 */
function toggle(id) {
    const el = document.getElementById(id);
    if (!el) return;

    const isHidden = el.classList.contains('hidden');
    if (isHidden) {
        el.classList.remove('hidden');
        el.style.maxHeight = el.scrollHeight + 'px';
    } else {
        el.classList.add('hidden');
        el.style.maxHeight = '0';
    }
}

/**
 * 初始化侧边栏：为所有隐藏的分组设置初始状态
 */
document.addEventListener('DOMContentLoaded', function() {
    // 为所有 nav-group-items 添加 hidden 类并设置初始 maxHeight
    document.querySelectorAll('.nav-group-items').forEach(function(el) {
        if (!el.classList.contains('nav-group-items-0')) {
            el.classList.add('hidden');
            el.style.maxHeight = '0';
            el.style.overflow = 'hidden';
            el.style.transition = 'max-height 0.3s ease-out';
        }
    });

    // 汉堡菜单移动端开关
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.toggle('open');
        });
    }

    // 点击主内容区域关闭侧边栏（移动端）
    document.addEventListener('click', function(e) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open')) {
            if (!sidebar.contains(e.target) && !document.querySelector('.hamburger')?.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        }
    });

    // 键盘可访问性：支持 Enter/Space 键触发 toggle
    document.querySelectorAll('.nav-group-title').forEach(function(el) {
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
        el.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const id = this.getAttribute('onclick')?.match(/toggle\('([^']+)'\)/)?.[1];
                if (id) toggle(id);
            }
        });
    });
});
