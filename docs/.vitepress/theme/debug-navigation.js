/* eslint-env browser */
/* eslint-disable no-console */
/* global setInterval */
// Временная система отладки навигации
function debugNavigation() {
    if (typeof window === 'undefined') return;

    console.log('🔧 Debug: Инициализация отладки навигации...');

    // Простая функция переключения навигации
    function toggleSidebar() {
        const sidebar = document.querySelector('.VPSidebar');
        const content = document.querySelector('.VPContent');

        if (!sidebar || !content) {
            console.log('❌ Debug: Sidebar или Content не найдены');
            return;
        }

        const isHidden = sidebar.style.display === 'none' || sidebar.classList.contains('hidden');

        if (isHidden) {
            // Показать
            sidebar.style.display = '';
            sidebar.style.transform = '';
            sidebar.style.opacity = '';
            sidebar.classList.remove('hidden');
            content.style.paddingLeft = '';
            console.log('✅ Debug: Навигация показана');
        } else {
            // Скрыть
            sidebar.style.display = 'none';
            content.style.paddingLeft = '0';
            console.log('✅ Debug: Навигация скрыта');
        }
    }

    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            console.log('🔧 Debug: Нажат Ctrl+H');
            toggleSidebar();
        }
    });

    // Создать кнопку отладки
    const debugButton = document.createElement('button');
    debugButton.innerHTML = '🔧 Debug Nav';
    debugButton.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        z-index: 10000;
        background: #ff6b6b;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    `;

    debugButton.addEventListener('click', () => {
        console.log('🔧 Debug: Клик по кнопке отладки');
        toggleSidebar();
    });

    document.body.appendChild(debugButton);

    // Информация о состоянии
    setInterval(() => {
        const sidebar = document.querySelector('.VPSidebar');
        const content = document.querySelector('.VPContent');

        if (sidebar && content) {
            console.log('🔧 Debug State:', {
                sidebarDisplay: sidebar.style.display,
                sidebarClasses: Array.from(sidebar.classList),
                contentPadding: content.style.paddingLeft,
                bodyClasses: Array.from(document.body.classList).filter(c => c.includes('nav'))
            });
        }
    }, 5000);

    console.log('✅ Debug: Отладка навигации готова');
}

// Запустить отладку
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', debugNavigation);
    } else {
        debugNavigation();
    }
} 