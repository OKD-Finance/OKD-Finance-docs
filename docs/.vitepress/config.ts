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
            ]
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