import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
    title: 'OKD Finance Exchange',
    description: 'Complete API documentation for OKD Finance cryptocurrency exchange platform',

    // Настройка для GitHub Pages
    base: '/okd-finance-docs/',

    // Отключаем проверку мертвых ссылок для деплоя
    ignoreDeadLinks: true,

    // Favicon и иконки
    head: [
        ['link', { rel: 'icon', type: 'image/x-icon', href: '/okd-finance-docs/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/okd-finance-docs/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/okd-finance-docs/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/okd-finance-docs/favicon-16x16.png' }],
        ['meta', { name: 'theme-color', content: '#667eea' }],
        ['meta', { name: 'msapplication-TileColor', content: '#667eea' }]
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
        socialLinks: [
            { icon: 'github', link: 'https://github.com/OKD-Finance/Backend' }
        ],
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025 OKD Finance'
        }
    },

    // Настройки сборки
    build: {
        outDir: '../dist'
    },

    // Настройки для лучшего SEO
    sitemap: {
        hostname: 'https://timofvy.github.io'
    },

    // Настройки для GitHub Pages
    cleanUrls: true,

    // Настройки производительности
    vite: {
        build: {
            minify: 'terser',
            chunkSizeWarningLimit: 1000
        }
    }
})) 