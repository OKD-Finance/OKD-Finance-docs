// Исправление языкового меню VitePress
function fixLanguageMenu() {
    console.log('🔧 Запуск исправления языкового меню...');

    // 1. Найти все элементы с aria-expanded
    const ariaButtons = document.querySelectorAll('[aria-expanded]');
    console.log('📍 Найдено кнопок с aria-expanded:', ariaButtons.length);

    ariaButtons.forEach((btn, i) => {
        console.log(`🔘 Кнопка ${i}:`, btn.textContent?.trim(), btn.className);

        // Убрать все блокирующие стили
        btn.style.zIndex = '99999';
        btn.style.position = 'relative';
        btn.style.pointerEvents = 'auto';
        btn.style.visibility = 'visible';
        btn.style.display = 'block';

        // Исправить всех родителей
        let parent = btn.parentElement;
        let depth = 0;
        while (parent && parent !== document.body && depth < 10) {
            parent.style.zIndex = '99999';
            parent.style.pointerEvents = 'auto';
            parent.style.visibility = 'visible';
            parent.style.overflow = 'visible';
            parent = parent.parentElement;
            depth++;
        }
    });

    // 2. Найти элементы языкового меню по тексту
    const allElements = document.querySelectorAll('*');
    const langElements = [];

    allElements.forEach(el => {
        const text = el.textContent?.trim();
        if (text === 'English' || text === 'Русский' || text === '中文') {
            langElements.push(el);
            console.log('🌐 Найден языковой элемент:', text, el.tagName, el.className);

            // Максимальный приоритет
            el.style.zIndex = '99999';
            el.style.position = 'relative';
            el.style.pointerEvents = 'auto';
            el.style.cursor = 'pointer';

            // Исправить родителей
            let parent = el.parentElement;
            let depth = 0;
            while (parent && depth < 8) {
                parent.style.zIndex = '99999';
                parent.style.pointerEvents = 'auto';
                parent.style.position = 'relative';
                parent = parent.parentElement;
                depth++;
            }
        }
    });

    // 3. Специальные VitePress селекторы
    const vpSelectors = [
        '.VPNavBar',
        '.VPNavBarExtra',
        '.VPNavBarTranslations',
        '.VPFlyout',
        '.VPMenu',
        '[class*="translation"]',
        '[class*="Translation"]'
    ];

    vpSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.zIndex = '99999';
            el.style.pointerEvents = 'auto';
            el.style.position = 'relative';
        });
    });

    // 4. Убрать overlay блокировки
    const overlays = document.querySelectorAll('[style*="position: fixed"], [style*="position: absolute"]');
    overlays.forEach(overlay => {
        if (overlay.style.zIndex && parseInt(overlay.style.zIndex) > 100 && parseInt(overlay.style.zIndex) < 10000) {
            console.log('🚫 Найден блокирующий overlay:', overlay, overlay.style.zIndex);
            overlay.style.zIndex = '50'; // Понизить приоритет
        }
    });

    console.log('✅ Исправление завершено');
}

// Запустить исправление при загрузке
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(fixLanguageMenu, 500);
});

// Запустить при готовности Vue
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(fixLanguageMenu, 1000);
    });
}

// Запустить исправление при изменении DOM
const observer = new MutationObserver(() => {
    fixLanguageMenu();
});

// Начать наблюдение после загрузки
setTimeout(() => {
    if (document.body) {
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['aria-expanded', 'class', 'style']
        });
    }
}, 1000);

// Запустить исправление каждые 3 секунды
setInterval(fixLanguageMenu, 3000);

// Глобальная функция для ручного вызова
window.fixLanguageMenu = fixLanguageMenu;

console.log('🚀 Language menu fix loaded - используйте fixLanguageMenu() в консоли'); 