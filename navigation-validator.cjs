const fs = require('fs');

class NavigationValidator {
    constructor(configPath = 'docs/.vitepress/config.ts') {
        this.configPath = configPath;
        this.expectedApiOrder = [
            'Overview',
            'User API',
            'Spot Trading API',
            'Authentication API',
            'Wallet API',
            'KYC API'
        ];
    }

    // Читаем и парсим конфигурацию
    readConfig() {
        try {
            const content = fs.readFileSync(this.configPath, 'utf8');
            return content;
        } catch (error) {
            console.error('❌ Error reading config file:', error.message);
            return null;
        }
    }

    // Проверяем синтаксис конфигурации
    validateSyntax(configContent) {
        const issues = [];

        // Проверяем парные скобки
        const openBraces = (configContent.match(/\{/g) || []).length;
        const closeBraces = (configContent.match(/\}/g) || []).length;
        const openBrackets = (configContent.match(/\[/g) || []).length;
        const closeBrackets = (configContent.match(/\]/g) || []).length;

        if (openBraces !== closeBraces) {
            issues.push(`Unmatched braces: ${openBraces} open, ${closeBraces} close`);
        }

        if (openBrackets !== closeBrackets) {
            issues.push(`Unmatched brackets: ${openBrackets} open, ${closeBrackets} close`);
        }

        // Проверяем запятые в конце объектов
        const badCommas = configContent.match(/,(\s*[[\]|}])/g);
        if (badCommas) {
            issues.push(`Trailing commas found: ${badCommas.length} instances`);
        }

        return issues;
    }

    // Извлекаем секцию API Reference
    extractApiSection(configContent) {
        const apiSectionRegex = /(\s+)text: 'API Reference',\s*\n\s*items: \[\s*\n([\s\S]*?)\n(\s+)\]\s*\n\s*\}/;
        const match = configContent.match(apiSectionRegex);

        if (!match) {
            console.log('❌ API Reference section not found');
            return null;
        }

        return {
            fullMatch: match[0],
            indent: match[1],
            itemsContent: match[2],
            endIndent: match[3],
            startIndex: match.index,
            endIndex: match.index + match[0].length
        };
    }

    // Парсим API элементы из секции
    parseApiItems(itemsContent) {
        const items = [];
        const itemRegex = /\{\s*text:\s*['"](.*?)['"],\s*link:\s*['"](.*?)['"][\s\S]*?\}/g;

        let match;
        while ((match = itemRegex.exec(itemsContent)) !== null) {
            const item = {
                text: match[1],
                link: match[2],
                startIndex: match.index,
                endIndex: match.index + match[0].length,
                fullMatch: match[0]
            };

            // Проверяем наличие sub-items
            const subItemsMatch = match[0].match(/items:\s*\[([\s\S]*?)\]/);
            if (subItemsMatch) {
                item.hasSubItems = true;
                item.subItemsContent = subItemsMatch[1];

                // Парсим sub-items
                const subItems = [];
                const subItemRegex = /\{\s*text:\s*['"](.*?)['"],\s*link:\s*['"](.*?)['"][\s\S]*?\}/g;
                let subMatch;
                while ((subMatch = subItemRegex.exec(subItemsMatch[1])) !== null) {
                    subItems.push({
                        text: subMatch[1],
                        link: subMatch[2]
                    });
                }
                item.subItems = subItems;
            }

            items.push(item);
        }

        return items;
    }

    // Находим дубликаты
    findDuplicates(items) {
        const seen = new Map();
        const duplicates = [];

        items.forEach((item, index) => {
            const key = item.text;
            if (seen.has(key)) {
                duplicates.push({
                    item,
                    index,
                    firstIndex: seen.get(key)
                });
            } else {
                seen.set(key, index);
            }
        });

        return duplicates;
    }

    // Проверяем порядок API
    checkOrder(items) {
        const issues = [];
        let expectedIndex = 0;

        items.forEach((item, actualIndex) => {
            const expectedApi = this.expectedApiOrder[expectedIndex];

            if (item.text === expectedApi) {
                expectedIndex++;
            } else if (this.expectedApiOrder.includes(item.text)) {
                // API есть в списке, но не в правильном порядке
                const correctIndex = this.expectedApiOrder.indexOf(item.text);
                issues.push({
                    api: item.text,
                    actualIndex,
                    expectedIndex: correctIndex,
                    issue: 'wrong_order'
                });
            }
        });

        return issues;
    }

    // Проверяем существование файлов
    checkFiles(items) {
        const issues = [];

        items.forEach(item => {
            if (item.link && item.link !== '/en/api/overview') {
                // Проверяем markdown файл
                const mdPath = `docs${item.link}.md`;
                if (!fs.existsSync(mdPath)) {
                    issues.push({
                        api: item.text,
                        file: mdPath,
                        issue: 'missing_md_file'
                    });
                }

                // Проверяем Vue компонент (если есть sub-items)
                if (item.hasSubItems) {
                    const componentName = item.text.replace(' API', '').replace(/\s+/g, '');
                    const vuePath = `docs/.vitepress/theme/components/Interactive${componentName}API.vue`;
                    if (!fs.existsSync(vuePath)) {
                        issues.push({
                            api: item.text,
                            file: vuePath,
                            issue: 'missing_vue_file'
                        });
                    }
                }
            }
        });

        return issues;
    }

    // Генерируем правильную структуру API секции
    generateCorrectApiSection(items) {
        // Удаляем дубликаты, оставляя последнюю версию (обычно более полную)
        const uniqueItems = new Map();
        items.forEach(item => {
            uniqueItems.set(item.text, item);
        });

        // Сортируем по ожидаемому порядку
        const sortedItems = Array.from(uniqueItems.values()).sort((a, b) => {
            const aIndex = this.expectedApiOrder.indexOf(a.text);
            const bIndex = this.expectedApiOrder.indexOf(b.text);

            if (aIndex === -1 && bIndex === -1) return 0;
            if (aIndex === -1) return 1;
            if (bIndex === -1) return -1;

            return aIndex - bIndex;
        });

        // Генерируем правильный контент
        const apiItems = sortedItems.map(item => {
            let itemContent = `                        {\n                            text: '${item.text}',\n                            link: '${item.link}'`;

            if (item.hasSubItems && item.subItems && item.subItems.length > 0) {
                itemContent += `,\n                            collapsed: true,\n                            items: [\n`;

                const subItemsContent = item.subItems.map(subItem =>
                    `                                { text: '${subItem.text}', link: '${subItem.link}' }`
                ).join(',\n');

                itemContent += subItemsContent + '\n                            ]';
            }

            itemContent += '\n                        }';
            return itemContent;
        }).join(',\n');

        return `                    {
                        text: 'API Reference',
                        items: [
${apiItems}
                        ]
                    }`;
    }

    // Добавляем API в навигацию
    addApiToNavigation(apiName, apiLink, subItems = []) {
        try {
            let configContent = this.readConfig();
            if (!configContent) return false;

            // Найти секцию '/en/api/' в sidebar
            const apiSectionRegex = /(\s+)'\/en\/api\/': \[\s*\n([\s\S]*?)\n(\s+)\],/;
            const match = configContent.match(apiSectionRegex);

            if (!match) {
                console.log('❌ Could not find /en/api/ section in sidebar');
                return false;
            }

            const [fullMatch, indent, sectionContent, endIndent] = match;

            // Парсим существующие API элементы из секции
            const existingApis = new Set();
            const apiItemRegex = /text:\s*['"](.*?)['"],/g;
            let itemMatch;

            while ((itemMatch = apiItemRegex.exec(sectionContent)) !== null) {
                if (itemMatch[1] !== 'API Reference' && itemMatch[1] !== 'Overview') {
                    existingApis.add(itemMatch[1]);
                }
            }

            // Если API уже существует, не добавляем дубликат
            if (existingApis.has(apiName)) {
                console.log(`✅ ${apiName} already exists in navigation`);
                return true;
            }

            // Создаем новую запись API
            let newApiItem;
            if (subItems.length > 0) {
                const subItemsStr = subItems.map(item =>
                    `${indent}                    { text: '${item.text}', link: '${item.link}' }`
                ).join(',\n');

                newApiItem = `,
${indent}            {
${indent}                text: '${apiName}',
${indent}                link: '${apiLink}',
${indent}                collapsed: true,
${indent}                items: [
${subItemsStr}
${indent}                ]
${indent}            }`;
            } else {
                newApiItem = `,
${indent}            {
${indent}                text: '${apiName}',
${indent}                link: '${apiLink}'
${indent}            }`;
            }

            // Найти место для вставки (после Overview)
            const overviewRegex = /(\s+text:\s*'Overview',\s*\n\s+link:\s*'\/en\/api\/overview'\s*\n\s+\})/;
            const overviewMatch = sectionContent.match(overviewRegex);

            let newSectionContent;
            if (overviewMatch) {
                // Вставляем после Overview
                newSectionContent = sectionContent.replace(overviewRegex, `$1${newApiItem}`);
            } else {
                // Если Overview не найден, добавляем в конец items
                const itemsEndRegex = /(\s+\]\s*\n\s+\})/;
                newSectionContent = sectionContent.replace(itemsEndRegex, `${newApiItem}$1`);
            }

            // Создаем новую секцию API
            const newApiSection = `${indent}'/en/api/': [
${newSectionContent}
${endIndent}],`;

            // Заменяем в конфиге
            const newConfigContent = configContent.replace(fullMatch, newApiSection);
            fs.writeFileSync(this.configPath, newConfigContent, 'utf8');

            console.log(`✅ Added ${apiName} to navigation (removed duplicates)`);
            return true;

        } catch (error) {
            console.error('❌ Error updating navigation:', error.message);
            return false;
        }
    }

    // Автоматически исправляем навигацию
    fixNavigation() {
        console.log('🔧 Starting navigation validation and fix...\n');

        const configContent = this.readConfig();
        if (!configContent) return false;

        // 1. Проверяем синтаксис
        console.log('1️⃣ Checking syntax...');
        const syntaxIssues = this.validateSyntax(configContent);
        if (syntaxIssues.length > 0) {
            console.log('❌ Syntax issues found:');
            syntaxIssues.forEach(issue => console.log(`   - ${issue}`));
        } else {
            console.log('✅ Syntax OK');
        }

        // 2. Извлекаем API секцию
        console.log('\n2️⃣ Extracting API section...');
        const apiSection = this.extractApiSection(configContent);
        if (!apiSection) return false;
        console.log('✅ API section found');

        // 3. Парсим API элементы
        console.log('\n3️⃣ Parsing API items...');
        const items = this.parseApiItems(apiSection.itemsContent);
        console.log(`✅ Found ${items.length} API items:`);
        items.forEach((item, index) => {
            const subItemsInfo = item.hasSubItems ? ` (${item.subItems.length} endpoints)` : '';
            console.log(`   ${index + 1}. ${item.text}${subItemsInfo}`);
        });

        // 4. Проверяем дубликаты
        console.log('\n4️⃣ Checking for duplicates...');
        const duplicates = this.findDuplicates(items);
        if (duplicates.length > 0) {
            console.log('❌ Duplicates found:');
            duplicates.forEach(dup => {
                console.log(`   - "${dup.item.text}" appears at positions ${dup.firstIndex + 1} and ${dup.index + 1}`);
            });
        } else {
            console.log('✅ No duplicates found');
        }

        // 5. Проверяем порядок
        console.log('\n5️⃣ Checking order...');
        const orderIssues = this.checkOrder(items);
        if (orderIssues.length > 0) {
            console.log('❌ Order issues found:');
            orderIssues.forEach(issue => {
                console.log(`   - "${issue.api}" is at position ${issue.actualIndex + 1}, should be at ${issue.expectedIndex + 1}`);
            });
        } else {
            console.log('✅ Order is correct');
        }

        // 6. Проверяем файлы
        console.log('\n6️⃣ Checking files...');
        const fileIssues = this.checkFiles(items);
        if (fileIssues.length > 0) {
            console.log('❌ File issues found:');
            fileIssues.forEach(issue => {
                console.log(`   - ${issue.api}: ${issue.file} (${issue.issue})`);
            });
        } else {
            console.log('✅ All files exist');
        }

        // 7. Исправляем если нужно
        const needsFix = duplicates.length > 0 || orderIssues.length > 0 || syntaxIssues.length > 0;

        if (needsFix) {
            console.log('\n🔧 Fixing navigation...');

            // Генерируем правильную структуру
            const correctApiSection = this.generateCorrectApiSection(items);

            // Заменяем в конфиге
            const beforeSection = configContent.substring(0, apiSection.startIndex);
            const afterSection = configContent.substring(apiSection.endIndex);
            const newConfigContent = beforeSection + correctApiSection + afterSection;

            // Сохраняем
            fs.writeFileSync(this.configPath, newConfigContent, 'utf8');
            console.log('✅ Navigation fixed and saved!');

            return true;
        } else {
            console.log('\n✅ Navigation is already correct!');
            return false;
        }
    }

    // Полная проверка с детальным отчетом
    validate() {
        console.log('🧭 Navigation Validation Report\n' + '='.repeat(50));

        const configContent = this.readConfig();
        if (!configContent) return false;

        const apiSection = this.extractApiSection(configContent);
        if (!apiSection) return false;

        const items = this.parseApiItems(apiSection.itemsContent);
        const duplicates = this.findDuplicates(items);
        const orderIssues = this.checkOrder(items);
        const fileIssues = this.checkFiles(items);
        const syntaxIssues = this.validateSyntax(configContent);

        console.log(`📊 Summary:
   - Total APIs: ${items.length}
   - Duplicates: ${duplicates.length}
   - Order issues: ${orderIssues.length}
   - File issues: ${fileIssues.length}
   - Syntax issues: ${syntaxIssues.length}
   
📋 Current API Structure:`);

        items.forEach((item, index) => {
            const subItemsInfo = item.hasSubItems ? ` (${item.subItems.length} endpoints)` : '';
            const issues = [];

            if (duplicates.some(d => d.index === index)) issues.push('DUPLICATE');
            if (orderIssues.some(o => o.actualIndex === index)) issues.push('WRONG_ORDER');
            if (fileIssues.some(f => f.api === item.text)) issues.push('MISSING_FILES');

            const issueText = issues.length > 0 ? ` ❌ [${issues.join(', ')}]` : ' ✅';
            console.log(`   ${index + 1}. ${item.text}${subItemsInfo}${issueText}`);
        });

        const hasIssues = duplicates.length > 0 || orderIssues.length > 0 || fileIssues.length > 0 || syntaxIssues.length > 0;

        if (hasIssues) {
            console.log('\n❌ Issues found! Run fixNavigation() to auto-fix.');
            return false;
        } else {
            console.log('\n✅ Navigation is perfect!');
            return true;
        }
    }
}

// Экспорт для использования в других модулях
module.exports = { NavigationValidator };

// Запуск если файл вызван напрямую
if (require.main === module) {
    const validator = new NavigationValidator();

    // Проверяем аргументы командной строки
    const args = process.argv.slice(2);

    if (args.includes('--fix') || args.includes('-f')) {
        validator.fixNavigation();
    } else if (args.includes('--validate') || args.includes('-v')) {
        validator.validate();
    } else {
        console.log(`
🧭 Navigation Validator

Usage:
  node navigation-validator.cjs --validate    # Detailed validation report
  node navigation-validator.cjs --fix         # Auto-fix navigation issues

Examples:
  node navigation-validator.cjs -v           # Quick validation
  node navigation-validator.cjs -f           # Quick fix
`);
    }
} 