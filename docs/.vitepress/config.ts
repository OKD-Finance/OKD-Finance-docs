import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'API Documentation',
    description: 'Complete API documentation for OKD Finance platform',

    locales: {
        root: {
            label: 'English',
            lang: 'en'
        },
        ru: {
            label: 'Русский',
            lang: 'ru'
        },
        zh: {
            label: '中文',
            lang: 'zh'
        }
    },

    themeConfig: {
        logo: '/logo.svg',

        nav: [
            { text: 'Home', link: '/' },
            { text: 'Guide', link: '/en/guide/introduction' },
            { text: 'API Reference', link: '/en/api/overview' },
            { text: 'Examples', link: '/en/examples/basic-usage' }
        ],

        sidebar: {
            '/en/guide/': [
                {
                    text: 'Getting Started',
                    items: [
                        { text: 'Introduction', link: '/en/guide/introduction' },
                        { text: 'Quick Start', link: '/en/guide/quick-start' },
                        { text: 'Authentication', link: '/en/guide/authentication' },
                        { text: 'Demo API', link: '/en/guide/demo-api' }
                    ]
                },
                {
                    text: 'Core Concepts',
                    items: [
                        { text: 'Architecture', link: '/en/guide/architecture' },
                        { text: 'Trading System', link: '/en/guide/trading' },
                        { text: 'Order Management', link: '/en/guide/orders' },
                        { text: 'Wallet System', link: '/en/guide/wallets' }
                    ]
                }
            ],

            '/en/api/': [
                {
                    text: 'API Reference',
                    collapsed: false,
                    items: [
                        { text: 'Overview', link: '/en/api/overview' },
                        { text: 'KYC API', link: '/en/api/kyc' },
                        { text: 'Authentication API', link: '/en/api/authentication' },
                        { text: 'Websocket Subscriptions', link: '/en/api/websocket-subscriptions' },
                        { text: 'Exchange Configuration', link: '/en/api/exchange-configuration' },
                        { text: 'Datasource API', link: '/en/api/datasource' },
                        { text: 'Errors API', link: '/en/api/errors' },
                        { text: 'Managed API', link: '/en/api/managed' },
                        { text: 'OKD API', link: '/en/api/okd' },
                        { text: 'User Operations API', link: '/en/api/user-operations' },
                        { text: 'Referral Program API', link: '/en/api/referral-program' },
                        { text: 'Spot API', link: '/en/api/spot' },
                        { text: 'ByBit REST Endpoints', link: '/en/api/bybit-rest-endpoints' },
                        { text: 'Wallet API', link: '/en/api/wallet' },
                        { text: 'User API', link: '/en/api/users' },
                        { text: 'Trading API', link: '/en/api/trading' }
                    ]
                }
            ],

            '/en/examples/': [
                {
                    text: 'Examples',
                    items: [
                        { text: 'Basic Usage', link: '/en/examples/basic-usage' },
                        { text: 'Trading Flow', link: '/en/examples/trading-flow' },
                        { text: 'ByBit Integration', link: '/en/examples/bybit-integration' },
                        { text: 'Webhooks', link: '/en/examples/webhooks' }
                    ]
                }
            ],

            '/en/trading/': [
                {
                    text: 'Trading',
                    items: [
                        { text: 'Overview', link: '/en/trading/overview' },
                        { text: 'Market Data', link: '/en/trading/market-data' },
                        { text: 'Orders', link: '/en/trading/orders' },
                        { text: 'Portfolio', link: '/en/trading/portfolio' }
                    ]
                }
            ],

            '/en/bybit/': [
                {
                    text: 'ByBit Integration',
                    items: [
                        { text: 'Overview', link: '/en/bybit/overview' },
                        { text: 'Configuration', link: '/en/bybit/configuration' },
                        { text: 'Market Data', link: '/en/bybit/market-data' },
                        { text: 'Order Routing', link: '/en/bybit/order-routing' }
                    ]
                }
            ],
            '/ru/api/': [
                {
                    text: 'Справочник API',
                    collapsed: false,
                    items: [
                        { text: 'Обзор', link: '/ru/api/overview' },
                        { text: 'KYC API', link: '/ru/api/kyc' },
                        { text: 'API Аутентификации', link: '/ru/api/authentication' },
                        { text: 'WebSocket Подписки', link: '/ru/api/websocket-subscriptions' },
                        { text: 'Конфигурация Биржи', link: '/ru/api/exchange-configuration' },
                        { text: 'API Источника Данных', link: '/ru/api/datasource' },
                        { text: 'API Ошибок', link: '/ru/api/errors' },
                        { text: 'Управляемый API', link: '/ru/api/managed' },
                        { text: 'OKD API', link: '/ru/api/okd' },
                        { text: 'API Операций Пользователя', link: '/ru/api/user-operations' },
                        { text: 'API Реферальной Программы', link: '/ru/api/referral-program' },
                        { text: 'Spot API', link: '/ru/api/spot' },
                        { text: 'ByBit REST Эндпоинты', link: '/ru/api/bybit-rest-endpoints' },
                        { text: 'API Кошелька', link: '/ru/api/wallet' },
                        { text: 'API Пользователя', link: '/ru/api/users' },
                        { text: 'API Торговли', link: '/ru/api/trading' }
                    ]
                }
            ],
            '/zh/api/': [
                {
                    text: 'API 参考',
                    collapsed: false,
                    items: [
                        { text: '概述', link: '/zh/api/overview' },
                        { text: 'KYC API', link: '/zh/api/kyc' },
                        { text: '身份验证 API', link: '/zh/api/authentication' },
                        { text: 'WebSocket 订阅', link: '/zh/api/websocket-subscriptions' },
                        { text: '交易所配置', link: '/zh/api/exchange-configuration' },
                        { text: '数据源 API', link: '/zh/api/datasource' },
                        { text: '错误 API', link: '/zh/api/errors' },
                        { text: '托管 API', link: '/zh/api/managed' },
                        { text: 'OKD API', link: '/zh/api/okd' },
                        { text: '用户操作 API', link: '/zh/api/user-operations' },
                        { text: '推荐程序 API', link: '/zh/api/referral-program' },
                        { text: '现货 API', link: '/zh/api/spot' },
                        { text: 'ByBit REST 端点', link: '/zh/api/bybit-rest-endpoints' },
                        { text: '钱包 API', link: '/zh/api/wallet' },
                        { text: '用户 API', link: '/zh/api/users' },
                        { text: '交易 API', link: '/zh/api/trading' }
                    ]
                }
            ],
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/okd-finance' }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024 OKD Finance'
        },

        search: {
            provider: 'local'
        }
    },

    head: [
        ['link', { rel: 'icon', href: '/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }]
    ],

    markdown: {
        theme: {
            light: 'github-light',
            dark: 'github-dark'
        },
        lineNumbers: true
    }
}) 