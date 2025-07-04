/* eslint-env node */

const fs = require('fs');
const path = require('path');

// API Documentation Translator
class APITranslator {
  constructor(config = {}) {
    this.config = {
      sourceDir: config.sourceDir || './docs/en/api',
      targetDirs: config.targetDirs || {
        ru: './docs/ru/api',
        zh: './docs/zh/api'
      },
      translationService: 'mock', // Вернулись к использованию только mock (словарных) переводов
      preserveTerms: config.preserveTerms || [
        'API', 'HTTP', 'JSON', 'REST', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH',
        'cURL', 'TypeScript', 'JavaScript', 'PHP', 'Python', 'Go',
        'OAuth', 'JWT', 'UUID', 'URL', 'URI', 'KYC', 'OKD', 'ByBit',
        'WebSocket', 'endpoint', 'token', 'refresh', 'access', 'Bearer',
        'Content-Type', 'Authorization', 'application/json'
      ],
      ...config
    };

    this.translations = {
      ru: {
        'API Reference': 'Справочник API',
        'Overview': 'Обзор',
        'Authentication': 'Аутентификация',
        'Parameters': 'Параметры',
        'Response': 'Ответ',
        'Request': 'Запрос',
        'Example': 'Пример',
        'Examples': 'Примеры',
        'Response Examples': 'Примеры ответов',
        'Description': 'Описание',
        'Required': 'Обязательный',
        'Optional': 'Необязательный',
        'Type': 'Тип',
        'Default': 'По умолчанию',
        'Status Code': 'Код состояния',
        'Success': 'Успех',
        'Error': 'Ошибка',
        'Wallet': 'Кошелек',
        'User': 'Пользователь',
        'Trading': 'Торговля',
        'Spot': 'Спот',
        'Order': 'Ордер',
        'Balance': 'Баланс',
        'Transaction': 'Транзакция',
        'History': 'История',
        'Configuration': 'Конфигурация',
        'Subscription': 'Подписка',
        'Websocket': 'Веб-сокет',
        'Exchange': 'Биржа',
        'Referral': 'Реферальная',
        'Program': 'Программа',
        'Operations': 'Операции',
        'Managed': 'Управляемый',
        'Datasource': 'Источник данных',
        'Errors': 'Ошибки',
        'ON THIS PAGE': 'НА ЭТОЙ СТРАНИЦЕ',
        'Authorize websocket connection.': 'Авторизация websocket-соединения.',
        'Do external market websocket operations. Payload contains bybit request. https://bybit-exchange.github.io/docs/v5/ws/connect': 'Выполнение внешних websocket-операций с рынком. Payload содержит запрос Bybit. https://bybit-exchange.github.io/docs/v5/ws/connect',
        'Subscribe to symbols events.': 'Подписаться на события символов.',
        'Unsubscribe from websocket events.': 'Отписаться от websocket-событий.',
        'Subscribe to notifications.': 'Подписаться на уведомления.',
        'Subscribe to total balance events.': 'Подписаться на события общего баланса.',
        'Authentication API': 'API Аутентификации',
        'Check account existence by firebase token.': 'Проверить существование аккаунта по токену Firebase.',
        'Send confirmation code to email.': 'Отправить код подтверждения на email.',
        'Inits operation to create user fcm.': 'Инициирует операцию по созданию fcm пользователя.',
        'Inits operation to delete user fcm by device id and fcm.': 'Инициирует операцию по удалению fcm пользователя по ID устройства и fcm.',
        'Get Google link for lgoin/register.': 'Получить ссылку Google для входа/регистрации.',
        'Regenerate a pair of authenticate tokens if refresh token is valid': 'Перегенерировать пару токенов аутентификации, если токен обновления действителен',
        'Inits operation to change current user locale.': 'Инициирует операцию по изменению текущей локали пользователя.',
        'Get notifications for user': 'Получить уведомления для пользователя',
        'Mark all/group of notifications as viewed. Body is optional.': 'Пометить все/группу уведомлений как просмотренные. Тело запроса необязательно.',
        'Delete all/group of notifications. Body is optional.': 'Удалить все/группу уведомлений. Тело запроса необязательно.',
        'Mark notification as viewed.': 'Пометить уведомление как просмотренное.',
        'Inits operation to turn OTP on (one time password) for current user.': 'Инициирует операцию по включению OTP (одноразового пароля) для текущего пользователя.',
        'Inits operation to turn OTP off (one time password 2FA) for current user by using email and OTP.': 'Инициирует операцию по отключению OTP (одноразового пароля 2FA) для текущего пользователя с использованием email и OTP.',
        'Inits operation to change current user password. Operation is valid only for regular and firebase accounts. It\'s no need to set old/new password for firebase account.': 'Инициирует операцию по изменению текущего пароля пользователя. Операция действительна только для обычных и Firebase аккаунтов. Нет необходимости устанавливать старый/новый пароль для Firebase аккаунта.',
        'Finishes restoration of current user password.': 'Завершает восстановление текущего пароля пользователя.',
        'Inits restoration of current user password.': 'Инициирует восстановление текущего пароля пользователя.',
        'Check restoration code.': 'Проверить код восстановления.',
        'GetProfile returns information about current user.': 'GetProfile возвращает информацию о текущем пользователе.',
        'SetProfile sets some fields in profile of current user. All fields are optional.': 'SetProfile устанавливает некоторые поля в профиле текущего пользователя. Все поля необязательны.',
        'Check possibility to remove account.': 'Проверить возможность удаления аккаунта.',
        'Inits operation to remove account. Reason maximum length is 200.': 'Инициирует операцию по удалению аккаунта. Максимальная длина причины - 200.',
        'Confirm login operation.': 'Подтвердить операцию входа.',
        'Logins user and return pair of tokens or login operation with hints.': 'Выполняет вход пользователя и возвращает пару токенов или операцию входа с подсказками.',
        'Sign in by firebase request.': 'Войти с помощью запроса Firebase.',
        'Sign in by Google OAuth2 request.': 'Войти с помощью запроса Google OAuth2.',
        'Resend email/phone codes for sign-in process.': 'Повторно отправить коды email/телефона для процесса входа.',
        'Logout remove user sessions and makes the token invalid.': 'Выйти из системы, удалить сессии пользователя и сделать токен недействительным.',
        'Registration save user in database and send verification url to email.': 'Регистрация сохраняет пользователя в базе данных и отправляет URL подтверждения на email.',
        'Sign up by Google OAuth2 request.': 'Зарегистрироваться с помощью запроса Google OAuth2.',
        'SetProfile sets profile flags of current user.': 'SetProfile устанавливает флаги профиля текущего пользователя.',
        'No description available': 'Описание отсутствует',
        '! Need access token in bearer token authorization': '! Требуется токен доступа в авторизации Bearer token',
        '! Need refresh token in bearer token authorization': '! Требуется токен обновления в авторизации Bearer token',
        'Only one of flags should be set.': 'Должен быть установлен только один из флагов.',
        'Bybit proxy API': 'API прокси Bybit',
        'Create internal transfer': 'Создать внутренний перевод',
        'Creates an internal transfer between different account types (spot, unified, etc.)': 'Создает внутренний перевод между различными типами счетов (спот, унифицированный и т.д.)',
        'Returns transfer ID and status. Result is described here.': 'Возвращает ID и статус перевода. Результат описан здесь.',
        'ByBit REST endpoints API': 'API REST эндпоинтов ByBit',
        'GET /v5/account/wallet-balance': 'GET /v5/account/wallet-balance',
        'GET /v5/asset/coin/query-info': 'GET /v5/asset/coin/query-info',
        'GET /v5/asset/deposit/query-allowed-list': 'GET /v5/asset/deposit/query-allowed-list',
        'GET /v5/asset/deposit/query-internal-record': 'GET /v5/asset/deposit/query-internal-record',
        'GET /v5/asset/deposit/query-record': 'GET /v5/asset/deposit/query-record',
        'GET /v5/asset/transfer/query-account-coin-balance': 'GET /v5/asset/transfer/query-account-coin-balance',
        'GET /v5/asset/transfer/query-account-coins-balance': 'GET /v5/asset/transfer/query-account-coins-balance',
        'GET /v5/asset/transfer/query-asset-info': 'GET /v5/asset/transfer/query-asset-info',
        'GET /v5/asset/transfer/query-inter-transfer-list': 'GET /v5/asset/transfer/query-inter-transfer-list',
        'GET /v5/asset/transfer/query-transfer-coin-list': 'GET /v5/asset/transfer/query-transfer-coin-list',
        'GET /v5/asset/withdraw/query-record': 'GET /v5/asset/withdraw/query-record',
        'GET /v5/asset/withdraw/withdrawable-amount': 'GET /v5/asset/withdraw/withdrawable-amount',
        'GET /v5/execution/list': 'GET /v5/execution/list',
        'GET /v5/market/index-price-kline': 'GET /v5/market/index-price-kline',
        'GET /v5/market/instruments-info': 'GET /v5/market/instruments-info',
        'GET /v5/market/kline': 'GET /v5/market/kline',
        'GET /v5/market/mark-price-kline': 'GET /v5/market/mark-price-kline',
        'GET /v5/market/orderbook': 'GET /v5/market/orderbook',
        'GET /v5/market/recent-trade': 'GET /v5/market/recent-trade',
        'GET /v5/market/tickers': 'GET /v5/market/tickers',
        'GET /v5/market/time': 'GET /v5/market/time',
        'POST /v5/order/amend': 'POST /v5/order/amend',
        'POST /v5/order/cancel-all': 'POST /v5/order/cancel-all',
        'GET /v5/order/history': 'GET /v5/order/history',
        'GET /v5/order/realtime': 'GET /v5/order/realtime',
        'GET /v5/order/spot-borrow-check': 'GET /v5/order/spot-borrow-check',
        'Datasource API': 'API Источника Данных',
        'GET /datasource/coin-info': 'GET /datasource/coin-info',
        'get coin info by asset id and source id': 'получить информацию о монете по ID актива и ID источника',
        'Get datasource assets price.': 'Получить цену активов источника данных.',
        'GET /datasource/prices/history': 'GET /datasource/prices/history',
        'get datasource prices history by asset id, coin id, source id and interval endpoint handler': 'получить историю цен источника данных по ID актива, ID монеты, ID источника и обработчику эндпоинта интервала',
        'Get datasource list.': 'Получить список источников данных.',
        'Errors API': 'API Ошибок',
        'Errors list.': 'Список ошибок.',
        'Exchange configuration API': 'API Конфигурации Биржи',
        'Returns assets. Result is described here. https://bybit-exchange.github.io/docs/v5/asset/coin-info': 'Возвращает активы. Результат описан здесь. https://bybit-exchange.github.io/docs/v5/asset/coin-info',
        'Returns networks (asset + chain) with trading/transaction states info.': 'Возвращает сети (актив + цепь) с информацией о состояниях торговли/транзакций.',
        'GET /config/flags': 'GET /config/flags',
        'Get global flags': 'Получить глобальные флаги',
        'Get withdrawal configuration for KYC levels.': 'Получить конфигурацию вывода средств для уровней KYC.',
        'KYC API': 'KYC API',
        'POST /amlbot/callback': 'POST /amlbot/callback',
        'Receives callback messages during KYC procedure': 'Получает сообщения обратного вызова во время процедуры KYC',
        'Queries and returns temporary access token needed for KYC procedure.': 'Запрашивает и возвращает временный токен доступа, необходимый для процедуры KYC.',
        'POST /kyc/webhook': 'POST /kyc/webhook',
        'Receives webhook messages during KYC procedure': 'Получает сообщения веб-хука во время процедуры KYC',
        'Managed API': 'Управляемый API',
        'Login user for managed ID.': 'Войти в систему для управляемого ID.',
        'Creates user for managed ID.': 'Создает пользователя для управляемого ID.',
        'OKD API': 'OKD API',
        'Send feedback.': 'Отправить отзыв.',
        'Send private feedback.': 'Отправить приватный отзыв.',
        'Send question.': 'Задать вопрос.',
        'List top assets.': 'Список топовых активов.',
        'Referral program API': 'API Реферальной программы',
        'Get list of referral link.': 'Получить список реферальных ссылок.',
        'Add referral link.': 'Добавить реферальную ссылку.',
        'Export history of fees to xlsx file': 'Экспортировать историю комиссий в файл xlsx',
        'Get history of fees': 'Получить историю комиссий',
        'Get public attributes of referral link.': 'Получить публичные атрибуты реферальной ссылки.',
        'Get current percents of referral program.': 'Получить текущие проценты реферальной программы.',
        'Get header of referral program.': 'Получить заголовок реферальной программы.',
        'Get details of referral link.': 'Получить детали реферальной ссылки.',
        'Set default referral link.': 'Установить реферальную ссылку по умолчанию.',
        'Spot API': 'API Спот',
        'Create spot order': 'Создать спотовый ордер',
        'Returns spot order id and order link id. Result is described here.': 'Возвращает ID спотового ордера и ID ссылки на ордер. Результат описан здесь.',
        'Cancel spot order': 'Отменить спотовый ордер',
        'List spot orders history': 'Список истории спотовых ордеров',
        'List spot open orders': 'Список открытых спотовых ордеров',
        'List spot trades history': 'Список истории спотовых сделок',
        'User Operations API': 'API Операций Пользователя',
        'Cancels operation by uuid.': 'Отменяет операцию по uuid.',
        'Confirms operation by uuid and code.': 'Подтверждает операцию по uuid и коду.',
        'Resends code to email for specified operation.': 'Повторно отправляет код на email для указанной операции.',
        'Wallet API': 'API Кошелька',
        'Get balances': 'Получить балансы',
        'Get total balance in USD': 'Получить общий баланс в USD',
        'Get user transactions history.': 'Получить историю транзакций пользователя.',
        'Returns deposit address for coin+chain. Result is described here.': 'Возвращает адрес для пополнения для монеты+цепочки. Результат описан здесь.',
        'Create internal transfer (operation) between users.': 'Создать внутренний перевод (операцию) между пользователями.',
        'Create withdrawal (operation) for specified assets': 'Создать вывод (операцию) для указанных активов',
        'Reject withdrawal confirmed by user.': 'Отклонить вывод, подтвержденный пользователем.',
        '! Need Bearer token and OTP authorization': '! Требуется Bearer токен и OTP авторизация',
        'API Overview': 'Обзор API',
        'Welcome to the OKD Finance API documentation. Our comprehensive API allows you to integrate with all aspects of our trading platform.': 'Добро пожаловать в документацию API OKD Finance. Наш всеобъемлющий API позволяет вам интегрироваться со всеми аспектами нашей торговой платформы.',
        'Available APIs': 'Доступные API',
        'Manage user authentication, tokens, and security.': 'Управление аутентификацией пользователей, токенами и безопасностью.',
        'View Authentication API': 'Просмотреть API Аутентификации',
        'Spot Trading': 'Спотовая торговля',
        'Execute spot trading operations.': 'Выполнять операции спотовой торговли.',
        'View Spot API': 'Просмотреть API Спот',
        'Wallet Management': 'Управление кошельком',
        'Manage user wallets and balances.': 'Управление кошельками и балансами пользователей.',
        'View Wallet API': 'Просмотреть API Кошелька',
        'User Operations': 'Операции пользователя',
        'Handle user account operations.': 'Обработка операций учетных записей пользователей.',
        'View User Operations API': 'Просмотреть API Операций Пользователя',
        'KYC': 'KYC',
        'Know Your Customer verification processes.': 'Процессы верификации «Знай своего клиента». Внутренний перевод не требуется.',
        'View KYC API': 'Просмотреть API KYC',
        'Exchange Configuration': 'Конфигурация биржи',
        'Configure exchange settings and parameters.': 'Настроить параметры и настройки биржи.',
        'View Exchange Configuration API': 'Просмотреть API Конфигурации Биржи',
        'Data Sources': 'Источники данных',
        'Access market data and analytics.': 'Доступ к рыночным данным и аналитике.',
        'View Datasource API': 'Просмотреть API Источника Данных',
        'Referral Program': 'Реферальная программа',
        'Manage referral programs and rewards.': 'Управление реферальными программами и вознаграждениями.',
        'View Referral Program API': 'Просмотреть API Реферальной программы',
        'Managed Services': 'Управляемые сервисы',
        'Enterprise and managed account features.': 'Функции корпоративных и управляемых учетных записей.',
        'View Managed API': 'Просмотреть Управляемый API',
        'WebSocket Subscriptions': 'Подписки WebSocket',
        'Real-time data subscriptions.': 'Подписки на данные в реальном времени.',
        'View WebSocket API': 'Просмотреть API WebSocket',
        'ByBit Integration': 'Интеграция ByBit',
        'ByBit exchange integration endpoints.': 'Эндпоинты интеграции с биржей ByBit.',
        'View ByBit REST API': 'Просмотреть API ByBit REST',
        'View ByBit Proxy API': 'Просмотреть API ByBit Proxy',
        'OKD Platform': 'Платформа OKD',
        'Core OKD platform functionality.': 'Основная функциональность платформы OKD.',
        'View OKD API': 'Просмотреть API OKD',
        'Error Handling': 'Обработка ошибок',
        'Error codes and handling.': 'Коды ошибок и их обработка.',
        'View Errors API': 'Просмотреть API Ошибок',
        'Getting Started': 'Начало работы',
        'Authentication: Start with the [Authentication API](/api/authentication) to get your access tokens': 'Аутентификация: Начните с [API Аутентификации](/api/authentication), чтобы получить ваши токены доступа',
        'Explore: Browse the specific API sections above': 'Изучение: Просмотрите указанные выше разделы API',
        'Test: Use the interactive testing features on each API page': 'Тестирование: Используйте интерактивные функции тестирования на каждой странице API',
        'Features': 'Функции',
        'Secure Authentication': 'Безопасная аутентификация',
        'with JWT tokens': 'с JWT токенами',
        'Interactive Testing': 'Интерактивное тестирование',
        'on every endpoint': 'на каждом эндпоинте',
        'in multiple languages': 'на нескольких языках',
        'Real Response Examples': 'Примеры реальных ответов',
        'from live API': 'из реального API',
        'Global Token Management': 'Глобальное управление токенами',
        'across all endpoints': 'по всем эндпоинтам',
        'Support': 'Поддержка',
        'For API support and questions, please refer to our documentation or contact our support team.': 'Для поддержки API и вопросов, пожалуйста, обратитесь к нашей документации или свяжитесь с нашей службой поддержки.'
      },
      zh: {
        'API Reference': 'API 参考',
        'Overview': '概述',
        'Authentication': '身份验证',
        'Parameters': '参数',
        'Response': '响应',
        'Request': '请求',
        'Example': '示例',
        'Examples': '示例',
        'Response Examples': '响应示例',
        'Description': '描述',
        'Required': '必需',
        'Optional': '可选',
        'Type': '类型',
        'Default': '默认',
        'Status Code': '状态码',
        'Success': '成功',
        'Error': '错误',
        'Wallet': '钱包',
        'User': '用户',
        'Trading': '交易',
        'Spot': '现货',
        'Order': '订单',
        'Balance': '余额',
        'Transaction': '交易记录',
        'History': '历史',
        'Configuration': '配置',
        'Subscription': '订阅',
        'Websocket': 'WebSocket',
        'Exchange': '交易所',
        'Referral': '推荐',
        'Program': '程序',
        'Operations': '操作',
        'Managed': '托管',
        'Datasource': '数据源',
        'Errors': '错误',
        'ON THIS PAGE': '本页内容',
        'Authorize websocket connection.': '授权 WebSocket 连接。',
        'Do external market websocket operations. Payload contains bybit request. https://bybit-exchange.github.io/docs/v5/ws/connect': '执行外部市场 WebSocket 操作。Payload 包含 Bybit 请求。https://bybit-exchange.github.io/docs/v5/ws/connect',
        'Subscribe to symbols events.': '订阅交易对事件。',
        'Unsubscribe from websocket events.': '取消订阅 WebSocket 事件。',
        'Subscribe to notifications.': '订阅通知。',
        'Subscribe to total balance events.': '订阅总余额事件。',
        'Authentication API': '身份验证 API',
        'Check account existence by firebase token.': '通过 Firebase 令牌检查账户是否存在。',
        'Send confirmation code to email.': '发送确认码到邮箱。',
        'Inits operation to create user fcm.': '启动创建用户 FCM 的操作。',
        'Inits operation to delete user fcm by device id and fcm.': '启动通过设备 ID 和 FCM 删除用户 FCM 的操作。',
        'Get Google link for lgoin/register.': '获取 Google 登录/注册链接。',
        'Regenerate a pair of authenticate tokens if refresh token is valid': '如果刷新令牌有效，重新生成一对认证令牌',
        'Inits operation to change current user locale.': '启动更改当前用户语言环境的操作。',
        'Get notifications for user': '获取用户通知',
        'Mark all/group of notifications as viewed. Body is optional.': '将所有/组通知标记为已读。请求体可选。',
        'Delete all/group of notifications. Body is optional.': '删除所有/组通知。请求体可选。',
        'Mark notification as viewed.': '将通知标记为已读。',
        'Inits operation to turn OTP on (one time password) for current user.': '启动为当前用户开启 OTP（一次性密码）的操作。',
        'Inits operation to turn OTP off (one time password 2FA) for current user by using email and OTP.': '启动为当前用户关闭 OTP（一次性密码 2FA）的操作，通过电子邮件和 OTP。',
        'Inits operation to change current user password. Operation is valid only for regular and firebase accounts. It\'s no need to set old/new password for firebase account.': '启动更改当前用户密码的操作。此操作仅适用于普通和 Firebase 账户。Firebase 账户无需设置旧/新密码。',
        'Finishes restoration of current user password.': '完成当前用户密码恢复。',
        'Inits restoration of current user password.': '启动当前用户密码恢复。',
        'Check restoration code.': '检查恢复代码。',
        'GetProfile returns information about current user.': 'GetProfile 返回当前用户信息。',
        'SetProfile sets some fields in profile of current user. All fields are optional.': 'SetProfile 设置当前用户配置文件中的某些字段。所有字段都是可选的。',
        'Check possibility to remove account.': '检查删除账户的可能性。',
        'Inits operation to remove account. Reason maximum length is 200.': '启动删除账户的操作。原因最大长度为 200。',
        'Confirm login operation.': '确认登录操作。',
        'Logins user and return pair of tokens or login operation with hints.': '用户登录并返回一对令牌或带有提示的登录操作。',
        'Sign in by firebase request.': '通过 Firebase 请求登录。',
        'Sign in by Google OAuth2 request.': '通过 Google OAuth2 请求登录。',
        'Resend email/phone codes for sign-in process.': '重新发送登录过程的电子邮件/电话验证码。',
        'Logout remove user sessions and makes the token invalid.': '注销，移除用户会话并使令牌无效。',
        'Registration save user in database and send verification url to email.': '注册将用户保存到数据库并发送验证 URL 到电子邮件。',
        'Sign up by Google OAuth2 request.': '通过 Google OAuth2 请求注册。',
        'SetProfile sets profile flags of current user.': 'SetProfile 设置当前用户的配置文件标志。',
        'No description available': '无可用描述',
        '! Need access token in bearer token authorization': '! Bearer token 授权中需要访问令牌',
        '! Need refresh token in bearer token authorization': '! Bearer token 授权中需要刷新令牌',
        'Only one of flags should be set.': '只能设置一个标志。',
        'Bybit proxy API': 'Bybit 代理 API',
        'Create internal transfer': '创建内部转账',
        'Creates an internal transfer between different account types (spot, unified, etc.)': '在不同账户类型（现货、统一等）之间创建内部转账',
        'Returns transfer ID and status. Result is described here.': '返回转账 ID 和状态。结果在此处描述。',
        'ByBit REST endpoints API': 'ByBit REST 端点 API',
        'GET /v5/account/wallet-balance': 'GET /v5/account/wallet-balance',
        'GET /v5/asset/coin/query-info': 'GET /v5/asset/coin/query-info',
        'GET /v5/asset/deposit/query-allowed-list': 'GET /v5/asset/deposit/query-allowed-list',
        'GET /v5/asset/deposit/query-internal-record': 'GET /v5/asset/deposit/query-internal-record',
        'GET /v5/asset/deposit/query-record': 'GET /v5/asset/deposit/query-record',
        'GET /v5/asset/transfer/query-account-coin-balance': 'GET /v5/asset/transfer/query-account-coin-balance',
        'GET /v5/asset/transfer/query-account-coins-balance': 'GET /v5/asset/transfer/query-account-coins-balance',
        'GET /v5/asset/transfer/query-asset-info': 'GET /v5/asset/transfer/query-asset-info',
        'GET /v5/asset/transfer/query-inter-transfer-list': 'GET /v5/asset/transfer/query-inter-transfer-list',
        'GET /v5/asset/transfer/query-transfer-coin-list': 'GET /v5/asset/transfer/query-transfer-coin-list',
        'GET /v5/asset/withdraw/query-record': 'GET /v5/asset/withdraw/query-record',
        'GET /v5/asset/withdraw/withdrawable-amount': 'GET /v5/asset/withdraw/withdrawable-amount',
        'GET /v5/execution/list': 'GET /v5/execution/list',
        'GET /v5/market/index-price-kline': 'GET /v5/market/index-price-kline',
        'GET /v5/market/instruments-info': 'GET /v5/market/instruments-info',
        'GET /v5/market/kline': 'GET /v5/market/kline',
        'GET /v5/market/mark-price-kline': 'GET /v5/market/mark-price-kline',
        'GET /v5/market/orderbook': 'GET /v5/market/orderbook',
        'GET /v5/market/recent-trade': 'GET /v5/market/recent-trade',
        'GET /v5/market/tickers': 'GET /v5/market/tickers',
        'GET /v5/market/time': 'GET /v5/market/time',
        'POST /v5/order/amend': 'POST /v5/order/amend',
        'POST /v5/order/cancel-all': 'POST /v5/order/cancel-all',
        'GET /v5/order/history': 'GET /v5/order/history',
        'GET /v5/order/realtime': 'GET /v5/order/realtime',
        'GET /v5/order/spot-borrow-check': 'GET /v5/order/spot-borrow-check',
        'Datasource API': '数据源 API',
        'GET /datasource/coin-info': 'GET /datasource/coin-info',
        'get coin info by asset id and source id': '根据资产ID和源ID获取代币信息',
        'Get datasource assets price.': '获取数据源资产价格。',
        'GET /datasource/prices/history': 'GET /datasource/prices/history',
        'get datasource prices history by asset id, coin id, source id and interval endpoint handler': '根据资产ID、代币ID、源ID和间隔端点处理程序获取数据源价格历史',
        'Get datasource list.': '获取数据源列表。',
        'Errors API': '错误 API',
        'Errors list.': '错误列表。',
        'Exchange configuration API': '交易所配置 API',
        'Returns assets. Result is described here. https://bybit-exchange.github.io/docs/v5/asset/coin-info': '返回资产。结果在此处描述。https://bybit-exchange.github.io/docs/v5/asset/coin-info',
        'Returns networks (asset + chain) with trading/transaction states info.': '返回包含交易/交易状态信息的网络（资产+链）。',
        'GET /config/flags': 'GET /config/flags',
        'Get global flags': '获取全局标志',
        'Get withdrawal configuration for KYC levels.': '获取 KYC 级别的提现配置。',
        'KYC API': 'KYC API',
        'POST /amlbot/callback': 'POST /amlbot/callback',
        'Receives callback messages during KYC procedure': '在 KYC 过程中接收回调消息',
        'Queries and returns temporary access token needed for KYC procedure.': '查询并返回 KYC 过程所需的临时访问令牌。',
        'POST /kyc/webhook': 'POST /kyc/webhook',
        'Receives webhook messages during KYC procedure': '在 KYC 过程中接收 Webhook 消息',
        'Managed API': '托管 API',
        'Login user for managed ID.': '使用托管 ID 登录用户。',
        'Creates user for managed ID.': '为托管 ID 创建用户。',
        'OKD API': 'OKD API',
        'Send feedback.': '发送反馈。',
        'Send private feedback.': '发送私人反馈。',
        'Send question.': '发送问题。',
        'List top assets.': '列出热门资产。',
        'Referral program API': '推荐计划 API',
        'Get list of referral link.': '获取推荐链接列表。',
        'Add referral link.': '添加推荐链接。',
        'Export history of fees to xlsx file': '将费用历史导出到 xlsx 文件',
        'Get history of fees': '获取费用历史',
        'Get public attributes of referral link.': '获取推荐链接的公共属性。',
        'Get current percents of referral program.': '获取推荐计划的当前百分比。',
        'Get header of referral program.': '获取推荐计划的标题。',
        'Get details of referral link.': '获取推荐链接的详细信息。',
        'Set default referral link.': '设置默认推荐链接。',
        'Spot API': '现货 API',
        'Create spot order': '创建现货订单',
        'Returns spot order id and order link id. Result is described here.': '返回现货订单 ID 和订单链接 ID。结果在此处描述。',
        'Cancel spot order': '取消现货订单',
        'List spot orders history': '列出现货订单历史',
        'List spot open orders': '列出现货未结订单',
        'List spot trades history': '列出现货交易历史',
        'User Operations API': '用户操作 API',
        'Cancels operation by uuid.': '按 UUID 取消操作。',
        'Confirms operation by uuid and code.': '按 UUID 和代码确认操作。',
        'Resends code to email for specified operation.': '为指定操作重新发送代码到电子邮件。',
        'Wallet API': '钱包 API',
        'Get balances': '获取余额',
        'Get total balance in USD': '获取美元总余额',
        'Get user transactions history.': '获取用户交易历史。',
        'Returns deposit address for coin+chain. Result is described here.': '返回币种+链的充值地址。结果在此处描述。',
        'Create internal transfer (operation) between users.': '创建用户之间的内部转账（操作）。',
        'Create withdrawal (operation) for specified assets': '为指定资产创建提现（操作）',
        'Reject withdrawal confirmed by user.': '拒绝用户确认的提现。',
        '! Need Bearer token and OTP authorization': '! 需要 Bearer 令牌和 OTP 授权',
        'API Overview': 'API 概览',
        'Welcome to the OKD Finance API documentation. Our comprehensive API allows you to integrate with all aspects of our trading platform.': '欢迎来到 OKD Finance API 文档。我们全面的 API 允许您与我们交易平台的所有方面进行集成。',
        'Available APIs': '可用 API',
        'Manage user authentication, tokens, and security.': '管理用户身份验证、令牌和安全。',
        'View Authentication API': '查看身份验证 API',
        'Spot Trading': '现货交易',
        'Execute spot trading operations.': '执行现货交易操作。',
        'View Spot API': '查看现货 API',
        'Wallet Management': '钱包管理',
        'Manage user wallets and balances.': '管理用户钱包和余额。',
        'View Wallet API': '查看钱包 API',
        'User Operations': '用户操作',
        'Handle user account operations.': '处理用户账户操作。',
        'View User Operations API': '查看用户操作 API',
        'KYC': 'KYC',
        'Know Your Customer verification processes.': '了解您的客户验证流程。',
        'View KYC API': '查看 KYC API',
        'Exchange Configuration': '交易所配置',
        'Configure exchange settings and parameters.': '配置交易所设置和参数。',
        'View Exchange Configuration API': '查看交易所配置 API',
        'Data Sources': '数据源',
        'Access market data and analytics.': '访问市场数据和分析。',
        'View Datasource API': '查看数据源 API',
        'Referral Program': '推荐计划',
        'Manage referral programs and rewards.': '管理推荐计划和奖励。',
        'View Referral Program API': '查看推荐计划 API',
        'Managed Services': '托管服务',
        'Enterprise and managed account features.': '企业和托管账户功能。',
        'View Managed API': '查看托管 API',
        'WebSocket Subscriptions': 'WebSocket 订阅',
        'Real-time data subscriptions.': '实时数据订阅。',
        'View WebSocket API': '查看 WebSocket API',
        'ByBit Integration': 'ByBit 集成',
        'ByBit exchange integration endpoints.': 'ByBit 交易所集成端点。',
        'View ByBit REST API': '查看 ByBit REST API',
        'View ByBit Proxy API': '查看 ByBit 代理 API',
        'OKD Platform': 'OKD 平台',
        'Core OKD platform functionality.': '核心 OKD 平台功能。',
        'View OKD API': '查看 OKD API',
        'Error Handling': '错误处理',
        'Error codes and handling.': '错误代码和处理。',
        'View Errors API': '查看错误 API',
        'Getting Started': '入门',
        'Authentication: Start with the [Authentication API](/api/authentication) to get your access tokens': '身份验证：从 [身份验证 API](/api/authentication) 开始获取您的访问令牌',
        'Explore: Browse the specific API sections above': '探索：浏览上面特定的 API 部分',
        'Test: Use the interactive testing features on each API page': '测试：在每个 API 页面上使用交互式测试功能',
        'Features': '功能',
        'Secure Authentication': '安全身份验证',
        'with JWT tokens': '使用 JWT 令牌',
        'Interactive Testing': '交互式测试',
        'on every endpoint': '在每个端点上',
        'in multiple languages': '多种语言',
        'Real Response Examples': '真实响应示例',
        'from live API': '来自实时 API',
        'Global Token Management': '全局令牌管理',
        'across all endpoints': '跨所有端点',
        'Support': '支持',
        'For API support and questions, please refer to our documentation or contact our support team.': '有关 API 支持和问题，请参阅我们的文档或联系我们的支持团队。'
      }
    };
  }

  async translateAll() {
    console.log('🌍 Starting API documentation translation...');

    for (const [lang, targetDir] of Object.entries(this.config.targetDirs)) {
      console.log(`\n📝 Translating to ${lang.toUpperCase()}...`);
      await this.translateLanguage(lang, targetDir);
    }

    console.log('\n🎉 Translation completed!');
  }

  async translateLanguage(lang, targetDir) {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const sourceFiles = fs.readdirSync(this.config.sourceDir)
      .filter(file => file.endsWith('.md'));

    console.log(`📋 Found ${sourceFiles.length} files to translate`);

    for (const file of sourceFiles) {
      const sourcePath = path.join(this.config.sourceDir, file);
      const targetPath = path.join(targetDir, file);

      try {
        console.log(`   🔄 Translating ${file}...`);
        await this.translateFile(sourcePath, targetPath, lang);
        console.log(`   ✅ Translated ${file}`);
      } catch (error) {
        console.log(`   ❌ Failed to translate ${file}: ${error.message}`);
      }
    }
  }

  async translateFile(sourcePath, targetPath, lang) {
    const content = fs.readFileSync(sourcePath, 'utf8');
    const translatedContent = await this.translateContent(content, lang);
    fs.writeFileSync(targetPath, translatedContent, 'utf8');
  }

  async translateContent(content, lang) {
    let translatedContent = content;

    if (this.translations[lang]) {
      for (const [original, translation] of Object.entries(this.translations[lang])) {
        // Translate headers
        translatedContent = translatedContent.replace(
          new RegExp(`^# ${original}$`, 'gm'),
          `# ${translation}`
        );
        translatedContent = translatedContent.replace(
          new RegExp(`^## ${original}$`, 'gm'),
          `## ${translation}`
        );
        translatedContent = translatedContent.replace(
          new RegExp(`^### ${original}$`, 'gm'),
          `### ${translation}`
        );

        // Translate text in links
        translatedContent = translatedContent.replace(
          new RegExp(`\\[${original}\\]`, 'g'),
          `[${translation}]`
        );
      }
    }

    // Update API links to point to centralized API directory (keep /api/ structure)
    // No need to change links since they already point to /api/

    // If using an external translation service, translate the rest of the content
    if (this.config.translationService === 'mock') {
      // В данный момент используем только mock сервис, внешние API отключены.
      // Этот метод не будет вызываться, если translationService установлен в 'mock'.
      return translatedContent;
    }

    return translatedContent;
  }

  async callTranslationAPI(content) {
    // В данный момент используем только mock сервис, внешние API отключены.
    // Этот метод не будет вызываться, если translationService установлен в 'mock'.
    return content;
  }

  updateVitePressConfig() {
    console.log('📝 Updating VitePress configuration...');

    const configPath = 'docs/.vitepress/config.ts';
    let configContent = fs.readFileSync(configPath, 'utf8');

    const ruNavigation = `
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
            ],`;

    const zhNavigation = `
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
            ],`;

    const insertAfter = `/en/bybit/': [
                {
                    text: 'ByBit Integration',
                    items: [
                        { text: 'Overview', link: '/en/bybit/overview' },
                        { text: 'Configuration', link: '/en/bybit/configuration' },
                        { text: 'Market Data', link: '/en/bybit/market-data' },
                        { text: 'Order Routing', link: '/en/bybit/order-routing' }
                    ]
                }
            ]`;

    if (configContent.includes(insertAfter) && !configContent.includes('/ru/api/')) {
      configContent = configContent.replace(
        insertAfter,
        insertAfter + ',' + ruNavigation + zhNavigation
      );

      fs.writeFileSync(configPath, configContent, 'utf8');
      console.log('✅ VitePress configuration updated');
    } else {
      console.log('⚠️ VitePress configuration already contains multi-language navigation');
    }
  }

  async getTranslationStats() {
    const stats = {
      source: 0,
      translated: {}
    };

    if (fs.existsSync(this.config.sourceDir)) {
      stats.source = fs.readdirSync(this.config.sourceDir)
        .filter(file => file.endsWith('.md')).length;
    }

    for (const [lang, targetDir] of Object.entries(this.config.targetDirs)) {
      if (fs.existsSync(targetDir)) {
        stats.translated[lang] = fs.readdirSync(targetDir)
          .filter(file => file.endsWith('.md')).length;
      } else {
        stats.translated[lang] = 0;
      }
    }

    return stats;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const translator = new APITranslator();

  try {
    if (args.length === 0 || args[0] === 'help') {
      console.log(`
🌍 API Documentation Translator

Usage:
  node api-translator.cjs <command>

Commands:
  translate         - Translate all API documentation
  stats            - Show translation statistics
  config           - Update VitePress configuration
  help             - Show this help

Examples:
  node api-translator.cjs translate
  node api-translator.cjs stats
`);
      return;
    }

    switch (args[0]) {
      case 'translate':
        await translator.translateAll();
        translator.updateVitePressConfig();
        break;

      case 'stats': {
        const stats = await translator.getTranslationStats();
        console.log('📊 Translation Statistics:');
        console.log(`   Source files (EN): ${stats.source}`);
        for (const [lang, count] of Object.entries(stats.translated)) {
          console.log(`   Translated files (${lang.toUpperCase()}): ${count}`);
        }
        break;
      }

      case 'config':
        translator.updateVitePressConfig();
        break;

      default:
        console.error(`❌ Unknown command: ${args[0]}`);
        process.exit(1);
    }

  } catch (error) {
    console.error('❌ Translation failed:', error.message);
    process.exit(1);
  }
}

module.exports = { APITranslator };

if (require.main === module) {
  main();
}
