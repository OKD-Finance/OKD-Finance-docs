import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'API Documentation',
    description: 'Complete API documentation for OKD Finance platform',
    base: '/OKD-Finance-docs/',

    locales: {
        root: {
            label: 'English',
            lang: 'en',
            themeConfig: {
                nav: [
                    { text: 'Home', link: '/' },
                    { text: 'Guide', link: '/guide/introduction' },
                    { text: 'API Reference', link: '/api/overview' },
                    { text: 'Examples', link: '/examples/basic-usage' }
                ]
            }
        },
        ru: {
            label: 'Русский',
            lang: 'ru',
            themeConfig: {
                nav: [
                    { text: 'Главная', link: '/ru/' },
                    { text: 'Руководство', link: '/ru/guide/introduction' },
                    { text: 'Справочник API', link: '/ru/api/overview' },
                    { text: 'Примеры', link: '/ru/examples/basic-usage' }
                ]
            }
        },
        zh: {
            label: '中文',
            lang: 'zh',
            themeConfig: {
                nav: [
                    { text: '首页', link: '/zh/' },
                    { text: '指南', link: '/zh/guide/introduction' },
                    { text: 'API 参考', link: '/zh/api/overview' },
                    { text: '示例', link: '/zh/examples/basic-usage' }
                ]
            }
        }
    },

    themeConfig: {
        logo: '/logo.svg',

        sidebar: {
            '/guide/': [
                {
                    text: 'Getting Started',
                    items: [
                        { text: 'Introduction', link: '/guide/introduction' },
                        { text: 'Quick Start', link: '/guide/quick-start' },
                        { text: 'Authentication', link: '/guide/authentication' },
                        { text: 'Demo API', link: '/guide/demo-api' }
                    ]
                },
                {
                    text: 'Core Concepts',
                    items: [
                        { text: 'Architecture', link: '/guide/architecture' },
                        { text: 'Trading System', link: '/guide/trading' },
                        { text: 'Order Management', link: '/guide/orders' },
                        { text: 'Wallet System', link: '/guide/wallets' }
                    ]
                }
            ],

            '/api/': [
                {
                    text: 'API Reference',
                    collapsed: false,
                    items: [
                        { text: 'Overview', link: '/api/overview' },
                        { text: 'KYC API', link: '/api/kyc' },
                        { text: 'Authentication API', link: '/api/authentication' },
                        { text: 'Websocket Subscriptions', link: '/api/websocket-subscriptions' },
                        { text: 'Exchange Configuration', link: '/api/exchange-configuration' },
                        { text: 'Datasource API', link: '/api/datasource' },
                        { text: 'Errors API', link: '/api/errors' },
                        { text: 'Managed API', link: '/api/managed' },
                        { text: 'OKD API', link: '/api/okd' },
                        { text: 'User Operations API', link: '/api/user-operations' },
                        { text: 'Referral Program API', link: '/api/referral-program' },
                        { text: 'Spot API', link: '/api/spot' },
                        { text: 'ByBit REST Endpoints', link: '/api/bybit-rest-endpoints' },
                        { text: 'Wallet API', link: '/api/wallet' },
                        { text: 'User API', link: '/api/users' },
                        { text: 'Trading API', link: '/api/trading' }
                    ]
                }
            ],

            '/examples/': [
                {
                    text: 'Examples',
                    items: [
                        { text: 'Basic Usage', link: '/examples/basic-usage' },
                        { text: 'Trading Flow', link: '/examples/trading-flow' },
                        { text: 'ByBit Integration', link: '/examples/bybit-integration' },
                        { text: 'Webhooks', link: '/examples/webhooks' }
                    ]
                }
            ],

            '/trading/': [
                {
                    text: 'Trading',
                    items: [
                        { text: 'Overview', link: '/trading/overview' },
                        { text: 'Market Data', link: '/trading/market-data' },
                        { text: 'Orders', link: '/trading/orders' },
                        { text: 'Portfolio', link: '/trading/portfolio' }
                    ]
                }
            ],

            '/bybit/': [
                {
                    text: 'ByBit Integration',
                    items: [
                        { text: 'Overview', link: '/bybit/overview' },
                        { text: 'Configuration', link: '/bybit/configuration' },
                        { text: 'Market Data', link: '/bybit/market-data' },
                        { text: 'Order Routing', link: '/bybit/order-routing' }
                    ]
                }
            ],
            '/ru/guide/': [
                {
                    text: 'Начало работы',
                    items: [
                        { text: 'Введение', link: '/ru/guide/introduction' },
                        { text: 'Быстрый старт', link: '/ru/guide/quick-start' },
                        { text: 'Аутентификация', link: '/ru/guide/authentication' },
                        { text: 'Demo API', link: '/ru/guide/demo-api' }
                    ]
                },
                {
                    text: 'Основные концепции',
                    items: [
                        { text: 'Архитектура', link: '/ru/guide/architecture' },
                        { text: 'Торговая система', link: '/ru/guide/trading' },
                        { text: 'Управление заказами', link: '/ru/guide/orders' },
                        { text: 'Система кошельков', link: '/ru/guide/wallets' }
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

            '/ru/examples/': [
                {
                    text: 'Примеры',
                    items: [
                        { text: 'Базовое использование', link: '/ru/examples/basic-usage' },
                        { text: 'Торговый поток', link: '/ru/examples/trading-flow' },
                        { text: 'Интеграция ByBit', link: '/ru/examples/bybit-integration' },
                        { text: 'Вебхуки', link: '/ru/examples/webhooks' }
                    ]
                }
            ],

            '/ru/trading/': [
                {
                    text: 'Торговля',
                    items: [
                        { text: 'Обзор', link: '/ru/trading/overview' },
                        { text: 'Рыночные данные', link: '/ru/trading/market-data' },
                        { text: 'Заказы', link: '/ru/trading/orders' },
                        { text: 'Портфель', link: '/ru/trading/portfolio' }
                    ]
                }
            ],

            '/ru/bybit/': [
                {
                    text: 'Интеграция ByBit',
                    items: [
                        { text: 'Обзор', link: '/ru/bybit/overview' },
                        { text: 'Конфигурация', link: '/ru/bybit/configuration' },
                        { text: 'Рыночные данные', link: '/ru/bybit/market-data' },
                        { text: 'Маршрутизация заказов', link: '/ru/bybit/order-routing' }
                    ]
                }
            ],

            '/zh/guide/': [
                {
                    text: '入门指南',
                    items: [
                        { text: '介绍', link: '/zh/guide/introduction' },
                        { text: '快速开始', link: '/zh/guide/quick-start' },
                        { text: '身份验证', link: '/zh/guide/authentication' },
                        { text: '演示 API', link: '/zh/guide/demo-api' }
                    ]
                },
                {
                    text: '核心概念',
                    items: [
                        { text: '架构', link: '/zh/guide/architecture' },
                        { text: '交易系统', link: '/zh/guide/trading' },
                        { text: '订单管理', link: '/zh/guide/orders' },
                        { text: '钱包系统', link: '/zh/guide/wallets' }
                    ]
                }
            ],

            '/zh/api/': [
                {
                    text: 'API 参考',
                    collapsed: false,
                    items: [
                        { text: '概述', link: '/api/overview' },
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

            '/zh/examples/': [
                {
                    text: '示例',
                    items: [
                        { text: '基本用法', link: '/zh/examples/basic-usage' },
                        { text: '交易流程', link: '/zh/examples/trading-flow' },
                        { text: 'ByBit 集成', link: '/zh/examples/bybit-integration' },
                        { text: 'Webhooks', link: '/zh/examples/webhooks' }
                    ]
                }
            ],

            '/zh/trading/': [
                {
                    text: '交易',
                    items: [
                        { text: '概述', link: '/zh/trading/overview' },
                        { text: '市场数据', link: '/zh/trading/market-data' },
                        { text: '订单', link: '/zh/trading/orders' },
                        { text: '投资组合', link: '/zh/trading/portfolio' }
                    ]
                }
            ],

            '/zh/bybit/': [
                {
                    text: 'ByBit 集成',
                    items: [
                        { text: '概述', link: '/zh/bybit/overview' },
                        { text: '配置', link: '/zh/bybit/configuration' },
                        { text: '市场数据', link: '/zh/bybit/market-data' },
                        { text: '订单路由', link: '/zh/bybit/order-routing' }
                    ]
                }
            ],
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/okd-finance' }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2025 OKD Finance'
        },

        search: {
            provider: 'local',
            options: {
                locales: {
                    root: {
                        translations: {
                            button: {
                                buttonText: 'Search',
                                buttonAriaLabel: 'Search'
                            },
                            modal: {
                                displayDetails: 'Display detailed list',
                                resetButtonTitle: 'Reset search',
                                backButtonTitle: 'Close search',
                                noResultsText: 'No results for',
                                footer: {
                                    selectText: 'to select',
                                    selectKeyAriaLabel: 'enter',
                                    navigateText: 'to navigate',
                                    navigateUpKeyAriaLabel: 'up arrow',
                                    navigateDownKeyAriaLabel: 'down arrow',
                                    closeText: 'to close',
                                    closeKeyAriaLabel: 'escape'
                                }
                            }
                        }
                    },
                    ru: {
                        translations: {
                            button: {
                                buttonText: 'Поиск',
                                buttonAriaLabel: 'Поиск'
                            },
                            modal: {
                                displayDetails: 'Показать подробный список',
                                resetButtonTitle: 'Сбросить поиск',
                                backButtonTitle: 'Закрыть поиск',
                                noResultsText: 'Нет результатов для',
                                footer: {
                                    selectText: 'для выбора',
                                    selectKeyAriaLabel: 'enter',
                                    navigateText: 'для навигации',
                                    navigateUpKeyAriaLabel: 'стрелка вверх',
                                    navigateDownKeyAriaLabel: 'стрелка вниз',
                                    closeText: 'для закрытия',
                                    closeKeyAriaLabel: 'escape'
                                }
                            }
                        }
                    },
                    zh: {
                        translations: {
                            button: {
                                buttonText: '搜索',
                                buttonAriaLabel: '搜索'
                            },
                            modal: {
                                displayDetails: '显示详细列表',
                                resetButtonTitle: '重置搜索',
                                backButtonTitle: '关闭搜索',
                                noResultsText: '没有找到结果',
                                footer: {
                                    selectText: '选择',
                                    selectKeyAriaLabel: 'enter',
                                    navigateText: '导航',
                                    navigateUpKeyAriaLabel: '上箭头',
                                    navigateDownKeyAriaLabel: '下箭头',
                                    closeText: '关闭',
                                    closeKeyAriaLabel: 'escape'
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    head: [
        ['link', { rel: 'icon', href: '/OKD-Finance-docs/favicon.ico' }],
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/OKD-Finance-docs/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/OKD-Finance-docs/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/OKD-Finance-docs/favicon-16x16.png' }]
    ],

    markdown: {
        theme: {
            light: 'github-light',
            dark: 'github-dark'
        },
        lineNumbers: true
    }
}) 