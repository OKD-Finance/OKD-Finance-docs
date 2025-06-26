import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'OKD Finance Exchange',
    description: 'Complete API documentation for OKD Finance cryptocurrency exchange platform',

    // Настройка для GitHub Pages
    base: '/OKD-Finance-docs/',

    // Отключаем проверку мертвых ссылок для деплоя
    ignoreDeadLinks: true,

    // Настройки для стабильной сборки
    cleanUrls: true,
    metaChunk: true,



    // Favicon и иконки
    head: [
        ['link', { rel: 'icon', type: 'image/x-icon', href: '/OKD-Finance-docs/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/OKD-Finance-docs/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/OKD-Finance-docs/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/OKD-Finance-docs/favicon-16x16.png' }],
        ['meta', { name: 'theme-color', content: '#667eea' }],
        ['meta', { name: 'msapplication-TileColor', content: '#667eea' }],
        ['style', {}, `
            :root {
                --okd-primary: #1e40af;
                --okd-secondary: #3b82f6;
                --okd-accent: #10b981;
                --okd-warning: #f59e0b;
                --okd-danger: #ef4444;
                --okd-dark: #1f2937;
                --okd-light: #f8fafc;
                --okd-gradient: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #10b981 100%);
            }

            /* General Card/Section Styling */
.api-key-section,
.api-demo {
    background-color: #1a1a1a;
    /* Darker background for sections */
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 25px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    border: 1px solid #333;
    /* Subtle border */
}

/* API Key Section specific gradient */
.api-key-section {
    background: linear-gradient(135deg, #2b2b2b, #1a1a1a);
    /* Dark gradient */
    border: none;
    /* Remove border for gradient effect */
}

/* Input Fields */
.api-key-input-group label,
.demo-controls label {
    display: block;
    margin-bottom: 8px;
    color: #ccc;
    /* Lighter text for labels */
    font-weight: 600;
    font-size: 0.95em;
}

.api-key-input,
.demo-controls input[type="text"],
.demo-controls input[type="number"] {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 15px;
    border: 1px solid #444;
    border-radius: 6px;
    background-color: #2a2a2a;
    /* Slightly lighter than section background */
    color: #eee;
    /* Light text color */
    font-size: 0.9em;
    box-sizing: border-box;
    /* Include padding and border in the element\'s total width and height */
}

.api-key-input:focus,
.demo-controls input[type="text"]:focus,
.demo-controls input[type="number"]:focus {
    border-color: #007bff;
    /* Highlight border on focus */
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* API Key Controls (for the API Key Input and Button) */
.api-key-controls {
    display: flex;
    align-items: flex-end;
    gap: 15px; /* Space between input group and button */
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.api-key-input-group {
    flex-grow: 1; /* Input group takes available space */
}

.set-api-key-button {
    flex-shrink: 0; /* Prevent button from shrinking */
}

.demo-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* Space between items in the row */
    align-items: flex-end; /* Align items at the bottom */
}

.input-group {
    flex: 1 1 calc(33.333% - 20px); /* Three columns for inputs */
    min-width: 200px; /* Minimum width for inputs before wrapping */
    background-color: transparent;
    padding: 10px;
    margin-bottom: 0; /* Ensure no extra margin */
}

.button-group {
    flex: 1 1 calc(33.333% - 20px); /* Make button group also a column */
    display: flex;
    gap: 10px; /* Space between buttons */
    margin-top: 0; /* Remove top margin as gap handles spacing */
    flex-wrap: wrap; /* Allow buttons to wrap on smaller screens */
    align-self: flex-end; /* Align buttons to the bottom of the row */
}

.demo-controls label {
    margin-bottom: 5px;
}

.demo-controls input {
    margin-bottom: 0;
    /* Remove bottom margin as gap handles spacing */
}

/* Buttons */
.set-api-key-button,
.test-button,
.copy-curl-button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9em;
    transition: background-color 0.2s ease, transform 0.1s ease;
    flex-grow: 1;
    /* Allow buttons to grow and fill space */
    min-width: 100px;
    /* Minimum width for buttons */
}

.set-api-key-button {
    background-color: #007bff;
    /* Blue color */
    color: white;
}

.set-api-key-button:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
}

.test-button {
    background-color: #28a745;
    /* Green color */
    color: white;
}

.test-button:hover {
    background-color: #218838;
    transform: translateY(-1px);
}

.copy-curl-button {
    background-color: #3a3a3a;
    /* Darker grey */
    color: #e0e0e0;
}

.copy-curl-button:hover {
    background-color: #2a2a2a;
    transform: translateY(-1px);
}

/* API Key Status */
.api-key-status {
    margin-top: 15px;
    font-size: 0.85em;
    color: #bbb;
}

/* Code Block Styling */
.language-bash {
    background-color: #23272d;
    /* VS Code-like dark background */
    color: #e0e0e0;
    /* Light text color */
    padding: 15px 20px;
    border-radius: 6px;
    margin-top: 25px;
    overflow-x: auto;
    /* Allow horizontal scrolling for long lines */
    font-family: \'SFMono-Regular\', Consolas, \'Liberation Mono\', Menlo, Courier, monospace;
    font-size: 0.85em;
    line-height: 1.4;
    white-space: pre-wrap;
    /* Wrap long lines */
}

.language-bash code {
    background-color: transparent;
    /* No background for inline code */
    color: inherit;
    /* Inherit color from parent */
    padding: 0;
}
        `]
    ],

    // Настройка локализации с английским как основным языком
    locales: {
        root: {
            label: 'English',
            lang: 'en',
            title: 'OKD Finance Exchange',
            description: 'Complete API documentation for OKD Finance cryptocurrency exchange platform',
            themeConfig: {
                outline: {
                    level: [2, 3],
                    label: 'On this page'
                },
                nav: [
                    { text: 'Guide', link: '/en/guide/introduction' },
                    { text: 'API Reference', link: '/en/api/overview' },
                    { text: 'Trading API', link: '/en/trading/overview' },
                    { text: 'Bybit Integration', link: '/en/bybit/overview' },
                    { text: 'Examples', link: '/en/examples/basic-usage' },
                    { text: 'Demo API', link: '/en/guide/demo-api' }
                ]
            }
        },
        ru: {
            label: 'Русский',
            lang: 'ru',
            title: 'OKD Finance Биржа',
            description: 'Полная документация API для криптовалютной биржи OKD Finance',
            themeConfig: {
                outline: {
                    level: [2, 3],
                    label: 'На этой странице'
                },
                nav: [
                    { text: 'Руководство', link: '/ru/guide/introduction' },
                    { text: 'API Справочник', link: '/ru/api/overview' },
                    { text: 'Торговый API', link: '/ru/trading/overview' },
                    { text: 'Интеграция Bybit', link: '/ru/bybit/overview' },
                    { text: 'Примеры', link: '/ru/examples/basic-usage' },
                    { text: 'Демо API', link: '/ru/guide/demo-api' }
                ],
                sidebar: {
                    '/ru/guide/': [
                        {
                            text: 'Начало работы',
                            items: [
                                { text: 'Введение', link: '/ru/guide/introduction' },
                                { text: 'Быстрый старт', link: '/ru/guide/quick-start' },
                                { text: 'Демо API', link: '/ru/guide/demo-api' },
                                { text: 'Архитектура', link: '/ru/guide/architecture' },
                                { text: 'Развертывание', link: '/ru/guide/deployment' }
                            ]
                        },
                        {
                            text: 'Основные концепции',
                            items: [
                                { text: 'Аутентификация', link: '/ru/guide/authentication' },
                                { text: 'Торговая система', link: '/ru/guide/trading' },
                                { text: 'Управление ордерами', link: '/ru/guide/orders' },
                                { text: 'Система кошельков', link: '/ru/guide/wallets' }
                            ]
                        }
                    ],
                    '/ru/api/': [
                        {
                            text: 'API Справочник',
                            items: [
                                { text: 'Обзор', link: '/ru/api/overview' },
                                { text: 'Аутентификация', link: '/ru/api/authentication' },
                                { text: 'Пользователи и аккаунты', link: '/ru/api/users' },
                                { text: 'Кошельки', link: '/ru/api/wallets' },
                                { text: 'KYC', link: '/ru/api/kyc' },
                                { text: 'Вебхуки', link: '/ru/api/webhooks' }
                            ]
                        }
                    ],
                    '/ru/trading/': [
                        {
                            text: 'Торговый API',
                            items: [
                                { text: 'Обзор', link: '/ru/trading/overview' },
                                { text: 'Рыночные данные', link: '/ru/trading/market-data' },
                                { text: 'Управление ордерами', link: '/ru/trading/orders' },
                                { text: 'Портфель', link: '/ru/trading/portfolio' }
                            ]
                        }
                    ],
                    '/ru/bybit/': [
                        {
                            text: 'Интеграция Bybit',
                            items: [
                                { text: 'Обзор', link: '/ru/bybit/overview' },
                                { text: 'Конфигурация', link: '/ru/bybit/configuration' },
                                { text: 'Маршрутизация ордеров', link: '/ru/bybit/order-routing' },
                                { text: 'Синхронизация данных', link: '/ru/bybit/market-data' }
                            ]
                        }
                    ],
                    '/ru/examples/': [
                        {
                            text: 'Примеры кода',
                            items: [
                                { text: 'Базовое использование', link: '/ru/examples/basic-usage' },
                                { text: 'Торговый поток', link: '/ru/examples/trading-flow' },
                                { text: 'Обработка вебхуков', link: '/ru/examples/webhooks' },
                                { text: 'Интеграция Bybit', link: '/ru/examples/bybit-integration' }
                            ]
                        }
                    ]
                }
            }
        },
        zh: {
            label: '中文',
            lang: 'zh-CN',
            title: 'OKD Finance 交易所',
            description: 'OKD Finance 加密货币交易所平台完整API文档',
            themeConfig: {
                outline: {
                    level: [2, 3],
                    label: '本页内容'
                },
                nav: [
                    { text: '指南', link: '/zh/guide/introduction' },
                    { text: 'API 参考', link: '/zh/api/overview' },
                    { text: '交易 API', link: '/zh/trading/overview' },
                    { text: 'Bybit 集成', link: '/zh/bybit/overview' },
                    { text: '示例', link: '/zh/examples/basic-usage' },
                    { text: '演示 API', link: '/zh/guide/demo-api' }
                ],
                sidebar: {
                    '/zh/guide/': [
                        {
                            text: '开始使用',
                            items: [
                                { text: '介绍', link: '/zh/guide/introduction' },
                                { text: '快速开始', link: '/zh/guide/quick-start' },
                                { text: '演示 API', link: '/zh/guide/demo-api' }
                            ]
                        }
                    ],
                    '/zh/api/': [
                        {
                            text: 'API 参考',
                            items: [
                                { text: '概述', link: '/zh/api/overview' },
                                { text: '身份验证', link: '/zh/api/authentication' }
                            ]
                        }
                    ]
                }
            }
        }
    },

    themeConfig: {
        logo: {
            light: '/logo.svg',
            dark: '/logo-dark.svg'
        },
        siteTitle: 'OK! Digital',

        // Настройка содержания страницы
        outline: {
            level: [2, 3],
            label: 'On this page'
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/OKD-Finance/Backend' }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025 OKD Finance'
        },

        editLink: {
            pattern: 'https://github.com/timofvy/OKD-Finance-docs/edit/main/docs/:path',
            text: 'Edit this page on GitHub'
        },

        lastUpdated: {
            text: 'Updated at',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'medium'
            }
        },

        search: {
            provider: 'local'
        },

        sidebar: {
            '/en/guide/': [
                {
                    text: 'Getting Started',
                    items: [
                        { text: 'Introduction', link: '/en/guide/introduction' },
                        { text: 'Quick Start', link: '/en/guide/quick-start' },
                        { text: 'Demo API', link: '/en/guide/demo-api' },
                        { text: 'Architecture', link: '/en/guide/architecture' },
                        { text: 'Deployment', link: '/en/guide/deployment' }
                    ]
                },
                {
                    text: 'Core Concepts',
                    items: [
                        { text: 'Authentication', link: '/en/guide/authentication' },
                        { text: 'Trading System', link: '/en/guide/trading' },
                        { text: 'Order Management', link: '/en/guide/orders' },
                        { text: 'Wallet System', link: '/en/guide/wallets' }
                    ]
                }
            ],
            '/en/api/': [
                {
                    text: 'API Reference',
                    items: [
                        {
                            'text': 'Overview',
                            'link': '/en/api/overview'
                        },
                        {
                            'text': 'Users',
                            'link': '/en/api/users'
                        },
                        {
                            'text': 'Authentication API',
                            'link': '/en/api/authentication'
                        },
                        {
                            'text': 'Spot Trading API',
                            'link': '/en/api/spot',
                            'collapsed': false,
                            'items': [
                                { 'text': 'POST /spot/orders', 'link': '/en/api/spot#place-trading-order' },
                                { 'text': 'GET /spot/orders/open', 'link': '/en/api/spot#get-open-orders' }
                            ]
                        },
                        {
                            'text': 'Wallet API',
                            'link': '/en/api/wallet'
                        },
                        {
                            'text': 'KYC API',
                            'link': '/en/api/kyc'
                        },
                        {
                            'text': 'User Operations API',
                            'link': '/en/api/user-operations'
                        },
                        {
                            'text': 'Referral Program API',
                            'link': '/en/api/referral-program'
                        },
                        {
                            'text': 'Exchange Configuration API',
                            'link': '/en/api/exchange-configuration'
                        },
                        {
                            'text': 'WebSocket Subscriptions API',
                            'link': '/en/api/websocket-subscriptions'
                        },
                        {
                            'text': 'Data Source API',
                            'link': '/en/api/datasource'
                        },
                        {
                            'text': 'Bybit REST Endpoints API',
                            'link': '/en/api/bybit-rest-endpoints'
                        },
                        {
                            'text': 'Managed Services API',
                            'link': '/en/api/managed'
                        },
                        {
                            'text': 'OKD API',
                            'link': '/en/api/okd'
                        },
                        {
                            'text': 'Error Handling API',
                            'link': '/en/api/errors'
                        },
                        {
                            'text': 'CMC Cases',
                            'link': '/en/api/cmc-cases'
                        },
                        {
                            'text': 'Access Management',
                            'link': '/en/api/access-management'
                        },
                        {
                            'text': 'Withdrawal',
                            'link': '/en/api/withdrawal'
                        },
                        {
                            'text': 'Exchange',
                            'link': '/en/api/exchange'
                        },
                        {
                            'text': 'Spot Order',
                            'link': '/en/api/spot-order'
                        },
                        {
                            'text': 'P2P',
                            'link': '/en/api/p2p'
                        },
                        {
                            'text': 'History',
                            'link': '/en/api/history'
                        },
                        {
                            'text': 'Settings',
                            'link': '/en/api/settings'
                        },
                        {
                            'text': 'Newsfeed',
                            'link': '/en/api/newsfeed'
                        },
                        {
                            'text': 'Notifications',
                            'link': '/en/api/notifications'
                        },
                        {
                            'text': 'Email Templates',
                            'link': '/en/api/email-templates'
                        },
                        {
                            'text': 'Fee Settings',
                            'link': '/en/api/fee-settings'
                        },
                        {
                            'text': 'Analytics',
                            'link': '/en/api/analytics'
                        },
                        {
                            'text': 'Audit',
                            'link': '/en/api/audit'
                        },
                        {
                            'text': 'Support',
                            'link': '/en/api/support'
                        }
                    ]
                }
            ],
            '/en/trading/': [
                {
                    text: 'Trading API',
                    items: [
                        { text: 'Overview', link: '/en/trading/overview' },
                        { text: 'Market Data', link: '/en/trading/market-data' },
                        { text: 'Orders', link: '/en/trading/orders' },
                        { text: 'Portfolio', link: '/en/trading/portfolio' }
                    ]
                }
            ],
            '/en/api/trading': [
                {
                    text: 'Spot Trading API',
                    collapsed: false,
                    items: [
                        { text: 'POST Create Order', link: '/en/api/trading#place-order' },
                        { text: 'GET All Orders', link: '/en/api/trading#get-orders' },
                        { text: 'GET Open Orders', link: '/en/api/trading#open-orders' },
                        { text: 'GET Order History', link: '/en/api/trading#order-history' },
                        { text: 'GET Trade History', link: '/en/api/trading#trade-history' }
                    ]
                }
            ],
            '/en/bybit/': [
                {
                    text: 'Bybit Integration',
                    items: [
                        { text: 'Overview', link: '/en/bybit/overview' },
                        { text: 'Configuration', link: '/en/bybit/configuration' },
                        { text: 'Order Routing', link: '/en/bybit/order-routing' },
                        { text: 'Market Data', link: '/en/bybit/market-data' }
                    ]
                }
            ],
            '/en/examples/': [
                {
                    text: 'Code Examples',
                    items: [
                        { text: 'Basic Usage', link: '/en/examples/basic-usage' },
                        { text: 'Bybit Integration', link: '/en/examples/bybit-integration' },
                        { text: 'Trading Flow', link: '/en/examples/trading-flow' },
                        { text: 'Webhooks', link: '/en/examples/webhooks' }
                    ]
                }
            ]
        }
    },

    // Настройки для лучшего SEO
    sitemap: {
        hostname: 'https://timofvy.github.io'
    },



    // Настройки markdown
    markdown: {
        theme: 'github-light'
    }
})