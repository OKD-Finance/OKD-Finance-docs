// Система управления навигацией - дополнительная логика
function initNavigationController() {
    // Проверить что мы в браузере
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    // console.log('🧭 Инициализация контроллера навигации...');

    // Настройки по умолчанию
    const defaultSettings = {
        navVisible: true,
        floatingMode: false,
        position: { x: 20, y: 100 },
        autoHide: false,
        compactMode: false
    };

    // Загрузить настройки
    function loadSettings() {
        const settings = { ...defaultSettings };

        try {
            const saved = localStorage.getItem('navigation-settings');
            if (saved) {
                Object.assign(settings, JSON.parse(saved));
            }
        } catch (error) {
            // console.warn('Не удалось загрузить настройки навигации:', error);
        }

        return settings;
    }

    // Сохранить настройки
    function saveSettings(settings) {
        try {
            localStorage.setItem('navigation-settings', JSON.stringify(settings));
        } catch (error) {
            // console.warn('Не удалось сохранить настройки навигации:', error);
        }
    }

    // Применить настройки к DOM
    function applySettings(settings) {
        // Применить к body
        document.body.classList.toggle('nav-floating-mode', settings.floatingMode);
        document.body.classList.toggle('nav-compact-mode', settings.compactMode);
        document.body.classList.toggle('nav-hidden', !settings.navVisible);

        // Применить к html для глобального действия
        document.documentElement.classList.toggle('nav-floating-mode', settings.floatingMode);
        document.documentElement.classList.toggle('nav-compact-mode', settings.compactMode);
        document.documentElement.classList.toggle('nav-hidden', !settings.navVisible);

        // Установить CSS переменные для позиции
        document.documentElement.style.setProperty('--nav-x', settings.position.x + 'px');
        document.documentElement.style.setProperty('--nav-y', settings.position.y + 'px');

        // Принудительно обновить layout через небольшую задержку
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);
    }

    // Обработчик изменения размера окна
    function handleResize() {
        const settings = loadSettings();

        // Автоматически переключиться в плавающий режим на мобильных
        if (window.innerWidth < 768 && !settings.floatingMode) {
            settings.floatingMode = true;
            settings.compactMode = true;
            saveSettings(settings);
            applySettings(settings);
        }

        // Переключиться обратно на десктопе
        if (window.innerWidth >= 768 && settings.compactMode) {
            settings.compactMode = false;
            saveSettings(settings);
            applySettings(settings);
        }
    }

    // Горячие клавиши
    function setupHotkeys() {
        document.addEventListener('keydown', (e) => {
            const settings = loadSettings();

            // Ctrl+H - переключить видимость навигации
            if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
                e.preventDefault();
                settings.navVisible = !settings.navVisible;
                saveSettings(settings);
                applySettings(settings);

                showNotification(
                    settings.navVisible ? 'Навигация показана' : 'Навигация скрыта'
                );
            }

            // Ctrl+M - переключить плавающий режим
            if ((e.ctrlKey || e.metaKey) && e.key === 'm') {
                e.preventDefault();
                settings.floatingMode = !settings.floatingMode;
                saveSettings(settings);
                applySettings(settings);

                showNotification(
                    settings.floatingMode ? 'Плавающий режим включен' : 'Плавающий режим выключен'
                );
            }

            // Ctrl+N - компактный режим
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                settings.compactMode = !settings.compactMode;
                saveSettings(settings);
                applySettings(settings);

                showNotification(
                    settings.compactMode ? 'Компактный режим включен' : 'Компактный режим выключен'
                );
            }
        });
    }

    // Показать уведомление
    function showNotification(message) {
        // Удалить предыдущее уведомление
        const existing = document.querySelector('.nav-notification');
        if (existing) {
            existing.remove();
        }

        // Создать новое уведомление
        const notification = document.createElement('div');
        notification.className = 'nav-notification';
        notification.textContent = message;

        // Стили уведомления
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'var(--vp-c-brand-1)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Анимация появления
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
        });

        // Удалить через 3 секунды
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Автоскрытие навигации при прокрутке (опционально)
    function setupAutoHide() {
        let lastScrollY = window.scrollY;
        let scrollTimeout;

        window.addEventListener('scroll', () => {
            const settings = loadSettings();
            if (!settings.autoHide) return;

            const currentScrollY = window.scrollY;
            const isScrollingDown = currentScrollY > lastScrollY;

            // Скрыть при прокрутке вниз, показать при прокрутке вверх
            if (isScrollingDown && currentScrollY > 100) {
                document.body.classList.add('nav-auto-hidden');
            } else {
                document.body.classList.remove('nav-auto-hidden');
            }

            lastScrollY = currentScrollY;

            // Показать навигацию когда прокрутка остановилась
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                document.body.classList.remove('nav-auto-hidden');
            }, 1000);
        });
    }

    // Контекстное меню для быстрых настроек
    function setupContextMenu() {
        document.addEventListener('contextmenu', (e) => {
            // Показать контекстное меню только на кнопке навигации
            const navButton = e.target.closest('.nav-toggle-btn, .floating-nav-header');
            if (!navButton) return;

            e.preventDefault();

            const menu = createContextMenu();
            document.body.appendChild(menu);

            // Позиционировать меню
            const x = Math.min(e.clientX, window.innerWidth - 200);
            const y = Math.min(e.clientY, window.innerHeight - 150);

            menu.style.left = x + 'px';
            menu.style.top = y + 'px';

            // Удалить меню при клике вне его
            const removeMenu = (event) => {
                if (!menu.contains(event.target)) {
                    menu.remove();
                    document.removeEventListener('click', removeMenu);
                }
            };

            setTimeout(() => {
                document.addEventListener('click', removeMenu);
            }, 100);
        });
    }

    // Создать контекстное меню
    function createContextMenu() {
        const settings = loadSettings();
        const menu = document.createElement('div');
        menu.className = 'nav-context-menu';

        const menuItems = [
            {
                text: settings.navVisible ? 'Скрыть навигацию' : 'Показать навигацию',
                shortcut: 'Ctrl+H',
                action: () => {
                    settings.navVisible = !settings.navVisible;
                    saveSettings(settings);
                    applySettings(settings);
                }
            },
            {
                text: settings.floatingMode ? 'Закрепить навигацию' : 'Плавающий режим',
                shortcut: 'Ctrl+M',
                action: () => {
                    settings.floatingMode = !settings.floatingMode;
                    saveSettings(settings);
                    applySettings(settings);
                }
            },
            {
                text: settings.compactMode ? 'Обычный режим' : 'Компактный режим',
                shortcut: 'Ctrl+N',
                action: () => {
                    settings.compactMode = !settings.compactMode;
                    saveSettings(settings);
                    applySettings(settings);
                }
            },
            { separator: true },
            {
                text: 'Сбросить позицию',
                action: () => {
                    settings.position = { ...defaultSettings.position };
                    saveSettings(settings);
                    applySettings(settings);
                    showNotification('Позиция сброшена');
                }
            }
        ];

        menuItems.forEach(item => {
            if (item.separator) {
                const separator = document.createElement('div');
                separator.className = 'nav-context-separator';
                menu.appendChild(separator);
            } else {
                const menuItem = document.createElement('div');
                menuItem.className = 'nav-context-item';
                menuItem.innerHTML = `
                    <span>${item.text}</span>
                    ${item.shortcut ? `<span class="shortcut">${item.shortcut}</span>` : ''}
                `;

                menuItem.addEventListener('click', () => {
                    item.action();
                    menu.remove();
                });

                menu.appendChild(menuItem);
            }
        });

        // Стили меню
        Object.assign(menu.style, {
            position: 'fixed',
            background: 'var(--vp-c-bg)',
            border: '1px solid var(--vp-c-border)',
            borderRadius: '6px',
            padding: '4px',
            minWidth: '180px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            zIndex: '10001',
            fontSize: '14px'
        });

        return menu;
    }

    // Инициализация
    function init() {
        const settings = loadSettings();
        applySettings(settings);

        setupHotkeys();
        setupAutoHide();
        setupContextMenu();

        // Обработчик изменения размера окна
        window.addEventListener('resize', handleResize);

        // Начальная проверка размера экрана
        handleResize();

        // console.log('✅ Контроллер навигации инициализирован');
    }

    // Запустить инициализацию
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Глобальный API
    window.navigationController = {
        loadSettings,
        saveSettings,
        applySettings,
        showNotification
    };
}

// Запустить только в браузере
if (typeof window !== 'undefined') {
    initNavigationController();
} 