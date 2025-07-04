/* eslint-env browser */
/* global setInterval */
// Временная система отладки навигации
function debugNavigation() {
    if (typeof window === 'undefined') return;

    // Простая функция переключения навигации
    function toggleSidebar() {
        const sidebar = document.querySelector('.VPSidebar');
        const content = document.querySelector('.VPContent');

        if (!sidebar || !content) {
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
        } else {
            // Скрыть
            sidebar.style.display = 'none';
            content.style.paddingLeft = '0';
        }
    }

    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            toggleSidebar();
        }
    });

    // Информация о состоянии
    setInterval(() => {
        const sidebar = document.querySelector('.VPSidebar');
        const content = document.querySelector('.VPContent');

        if (sidebar && content) {
            // No console logs here anymore
        }
    }, 5000);
}

// Запустить отладку
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', debugNavigation);
    } else {
        debugNavigation();
    }
} 