// Улучшения для поиска VitePress
function enhanceSearch() {
    // Проверить что мы в браузере
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    // console.log('🔍 Загрузка улучшений поиска...');

    // Исправить z-index поисковой модалки
    const searchElements = document.querySelectorAll(
        '.VPLocalSearchBox, [class*="search"], [class*="Search"]'
    );

    searchElements.forEach(el => {
        el.style.zIndex = '99999';
    });

    // Добавить горячие клавиши
    document.addEventListener('keydown', (e) => {
        // Ctrl+K или Cmd+K для открытия поиска
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchButton = document.querySelector('.VPNavBarSearch button, [aria-label*="search"], [aria-label*="Search"], [aria-label*="поиск"], [aria-label*="Поиск"]');
            if (searchButton) {
                searchButton.click();
            }
        }

        // ESC для закрытия поиска
        if (e.key === 'Escape') {
            const searchBox = document.querySelector('.VPLocalSearchBox');
            if (searchBox) {
                const closeButton = searchBox.querySelector('[aria-label*="close"], [aria-label*="закрыть"]');
                if (closeButton) {
                    closeButton.click();
                }
            }
        }
    });

    // Улучшить поисковые результаты
    const observer = new MutationObserver(() => {
        const searchBox = document.querySelector('.VPLocalSearchBox');
        if (searchBox) {
            // Убедиться что поиск поверх всех элементов
            searchBox.style.zIndex = '99999';

            const backdrop = searchBox.querySelector('.backdrop');
            if (backdrop) {
                backdrop.style.zIndex = '99998';
            }

            const shell = searchBox.querySelector('.shell');
            if (shell) {
                shell.style.zIndex = '99999';
            }

            // Добавить индикатор загрузки
            const searchInput = searchBox.querySelector('input');
            if (searchInput && !searchInput.dataset.enhanced) {
                searchInput.dataset.enhanced = 'true';

                // Добавить плейсхолдер в зависимости от языка
                const lang = document.documentElement.lang || 'en';
                const placeholders = {
                    'en': 'Search documentation... (Ctrl+K)',
                    'ru': 'Поиск по документации... (Ctrl+K)',
                    'zh': '搜索文档... (Ctrl+K)'
                };

                searchInput.placeholder = placeholders[lang] || placeholders['en'];

                // Добавить обработчик ввода
                let searchTimeout;
                searchInput.addEventListener('input', (e) => {
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(() => {
                        // console.log('🔍 Поиск:', e.target.value);
                    }, 300);
                });
            }

            // Улучшить результаты поиска
            const results = searchBox.querySelectorAll('.result');
            results.forEach((result, index) => {
                if (!result.dataset.enhanced) {
                    result.dataset.enhanced = 'true';

                    // Добавить номер результата
                    const title = result.querySelector('.title');
                    if (title && !title.querySelector('.result-number')) {
                        const number = document.createElement('span');
                        number.className = 'result-number';
                        number.textContent = `${index + 1}. `;
                        number.style.cssText = 'color: #6b7280; font-weight: normal; margin-right: 4px;';
                        title.insertBefore(number, title.firstChild);
                    }

                    // Добавить клавиатурную навигацию
                    result.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            result.click();
                        }
                    });
                }
            });
        }
    });

    // Наблюдать за изменениями DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // console.log('✅ Улучшения поиска загружены');
}

// Запустить только в браузере
if (typeof window !== 'undefined') {
    // Запустить при загрузке
    document.addEventListener('DOMContentLoaded', enhanceSearch);
    window.addEventListener('load', enhanceSearch);

    // Запускать периодически
    setInterval(enhanceSearch, 2000);

    // Глобальная функция
    window.enhanceSearch = enhanceSearch;

    // console.log('🚀 Search enhancements loaded');
} 