import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'OKD Finance Exchange',
    description: 'Complete API documentation for OKD Finance cryptocurrency exchange platform',

    // Настройка для GitHub Pages
    base: '/okd-finance-docs/',

    // Отключаем проверку мертвых ссылок для деплоя
    ignoreDeadLinks: true,

    // Настройки для стабильной сборки
    cleanUrls: true,
    metaChunk: true,



    // Favicon и иконки
    head: [
        ['link', { rel: 'icon', type: 'image/x-icon', href: '/okd-finance-docs/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/okd-finance-docs/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/okd-finance-docs/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/okd-finance-docs/favicon-16x16.png' }],
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
                        { text: 'Overview', link: '/en/api/overview' },
                        { text: 'Authentication', link: '/en/api/authentication' },
                        { text: 'Users & Accounts', link: '/en/api/users' },
                        { text: 'Wallets', link: '/en/api/wallets' },
                        { text: 'KYC', link: '/en/api/kyc' },
                        { text: 'Webhooks', link: '/en/api/webhooks' }
                    ]
                }
            ],
            '/en/trading/': [
                {
                    text: 'Trading API',
                    items: [
                        { text: 'Overview', link: '/en/trading/overview' },
                        { text: 'Market Data', link: '/en/trading/market-data' },
                        { text: 'Order Management', link: '/en/trading/orders' },
                        { text: 'Portfolio', link: '/en/trading/portfolio' }
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
                        { text: 'Market Data Sync', link: '/en/bybit/market-data' }
                    ]
                }
            ],
            '/en/examples/': [
                {
                    text: 'Code Examples',
                    items: [
                        { text: 'Basic Usage', link: '/en/examples/basic-usage' },
                        { text: 'Trading Flow', link: '/en/examples/trading-flow' },
                        { text: 'Webhook Handling', link: '/en/examples/webhooks' },
                        { text: 'Bybit Integration', link: '/en/examples/bybit-integration' }
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