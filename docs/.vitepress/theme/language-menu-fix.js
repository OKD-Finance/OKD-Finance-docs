/* eslint-env browser */
/* global MutationObserver, setInterval */
// Исправление языкового меню VitePress

const onThisPageI18n = {
    en: "ON THIS PAGE",
    ru: "НА ЭТОЙ СТРАНИЦЕ",
    zh: "在本页"
};

const linkTranslations = {
    en: {
        "Home": "Home",
        "Guide": "Guide",
        "API Reference": "API Reference",
        "Examples": "Examples",
        "Overview": "Overview",
        "KYC API": "KYC API",
        "Authentication API": "Authentication API",
        "Websocket Subscriptions": "Websocket Subscriptions",
        "Exchange Configuration": "Exchange Configuration",
        "Datasource API": "Datasource API",
        "Errors API": "Errors API",
        "Managed API": "Managed API",
        "OKD API": "OKD API",
        "User Operations API": "User Operations API",
        "Referral Program API": "Referral Program API",
        "Spot API": "Spot API",
        "ByBit REST Endpoints": "ByBit REST Endpoints",
        "Wallet API": "Wallet API",
        "User API": "User API",
        "Trading API": "Trading API",
        "Basic Usage": "Basic Usage",
        "Trading Flow": "Trading Flow",
        "ByBit Integration": "ByBit Integration",
        "Webhooks": "Webhooks",
        "Market Data": "Market Data",
        "Orders": "Orders",
        "Portfolio": "Portfolio",
        "Configuration": "Configuration",
        "Order Routing": "Order Routing",
        "Getting Started": "Getting Started",
        "Introduction": "Introduction",
        "Quick Start": "Quick Start",
        "Authentication": "Authentication",
        "Demo API": "Demo API",
        "Core Concepts": "Core Concepts",
        "Architecture": "Architecture",
        "Trading System": "Trading System",
        "Order Management": "Order Management",
        "Wallet System": "Wallet System",
    },
    ru: {
        "Home": "Главная",
        "Guide": "Руководство",
        "API Reference": "Справочник API",
        "Examples": "Примеры",
        "Overview": "Обзор",
        "KYC API": "KYC API",
        "Authentication API": "API Аутентификации",
        "Websocket Subscriptions": "WebSocket Подписки",
        "Exchange Configuration": "Конфигурация Биржи",
        "Datasource API": "API Источника Данных",
        "Errors API": "API Ошибок",
        "Managed API": "Управляемый API",
        "OKD API": "OKD API",
        "User Operations API": "API Операций Пользователя",
        "Referral Program API": "API Реферальной Программы",
        "Spot API": "Spot API",
        "ByBit REST Endpoints": "ByBit REST Эндпоинты",
        "Wallet API": "API Кошелька",
        "User API": "API Пользователя",
        "Trading API": "API Торговли",
        "Basic Usage": "Базовое использование",
        "Trading Flow": "Торговый поток",
        "ByBit Integration": "Интеграция ByBit",
        "Webhooks": "Вебхуки",
        "Market Data": "Рыночные данные",
        "Orders": "Заказы",
        "Portfolio": "Портфель",
        "Configuration": "Конфигурация",
        "Order Routing": "Маршрутизация заказов",
        "Getting Started": "Начало работы",
        "Introduction": "Введение",
        "Quick Start": "Быстрый старт",
        "Authentication": "Аутентификация",
        "Demo API": "Demo API",
        "Core Concepts": "Основные концепции",
        "Architecture": "Архитектура",
        "Trading System": "Торговая система",
        "Order Management": "Управление заказами",
        "Wallet System": "Система кошельков",
    },
    zh: {
        "Home": "首页",
        "Guide": "指南",
        "API Reference": "API 参考",
        "Examples": "示例",
        "Overview": "概述",
        "KYC API": "KYC API",
        "Authentication API": "身份验证 API",
        "Websocket Subscriptions": "WebSocket 订阅",
        "Exchange Configuration": "交易所配置",
        "Datasource API": "数据源 API",
        "Errors API": "错误 API",
        "Managed API": "托管 API",
        "OKD API": "OKD API",
        "User Operations API": "用户操作 API",
        "Referral Program API": "推荐程序 API",
        "Spot API": "现货 API",
        "ByBit REST Endpoints": "ByBit REST 端点",
        "Wallet API": "钱包 API",
        "User API": "用户 API",
        "Trading API": "交易 API",
        "Basic Usage": "基本用法",
        "Trading Flow": "交易流程",
        "ByBit Integration": "ByBit 集成",
        "Webhooks": "Webhooks",
        "Market Data": "市场数据",
        "Orders": "订单",
        "Portfolio": "投资组合",
        "Configuration": "配置",
        "Order Routing": "订单路由",
        "Getting Started": "入门指南",
        "Introduction": "介绍",
        "Quick Start": "快速开始",
        "Authentication": "身份验证",
        "Demo API": "演示 API",
        "Core Concepts": "核心概念",
        "Architecture": "架构",
        "Trading System": "交易系统",
        "Order Management": "订单管理",
        "Wallet System": "钱包系统",
    }
};

function getCurrentLang() {
    let lang = document.documentElement.lang;
    if (!lang) {
        const m = location.pathname.match(/^\/(ru|en|zh)\b/);
        lang = m ? m[1] : 'en';
    }
    // Fallback to English if translation for current language is not found
    if (!onThisPageI18n[lang]) lang = 'en';
    return lang;
}

function fixLanguageMenu() {
    // 1. Найти все элементы с aria-expanded
    const ariaButtons = document.querySelectorAll('[aria-expanded]');

    ariaButtons.forEach((btn, i) => {
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
        '[class*="Translation"]',
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
            overlay.style.zIndex = '50'; // Понизить приоритет
        }
    });

    // 5. Перевести заголовок "ON THIS PAGE"
    const onThisPageTitle = document.querySelector('.VPDoc aside.right-sidebar h2');
    if (onThisPageTitle) {
        const currentLang = getCurrentLang();
        onThisPageTitle.textContent = onThisPageI18n[currentLang];
    }

    // 6. Перевести все ссылки навигации
    const currentLang = getCurrentLang();
    const links = document.querySelectorAll('.VPNavBar a, .VPSidebar a, .VPLink');
    links.forEach(link => {
        const originalText = link.textContent?.trim();
        if (originalText && linkTranslations[currentLang] && linkTranslations[currentLang][originalText]) {
            link.textContent = linkTranslations[currentLang][originalText];
        }
    });
}

// Запустить только в браузере
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Запустить исправление при загрузке
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(fixLanguageMenu, 500);
    });

    // Запустить при готовности Vue
    window.addEventListener('load', () => {
        setTimeout(fixLanguageMenu, 1000);
    });

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
} 