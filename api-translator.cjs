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
      translationService: config.translationService || 'mock',
      apiKey: config.apiKey || process.env.TRANSLATION_API_KEY,
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
        'Code Examples': 'Примеры кода',
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
        'Errors': 'Ошибки'
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
        'Code Examples': '代码示例',
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
        'Errors': '错误'
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
      .filter(file => file.endsWith('.md'))
      .filter(file => file !== 'overview.md');

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
      }
    }

    return translatedContent;
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
