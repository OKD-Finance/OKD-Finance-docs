#!/usr/bin/env node

const { UniversalAPIGenerator } = require('./universal-swagger-generator-final.cjs');

console.log('🧪 Тестирование исправленного swagger-generator...\n');

// Создаем тестовый API
const generator = new UniversalAPIGenerator();

const testEndpoints = [
    {
        method: 'GET',
        path: '/test/endpoint',
        title: 'Test Endpoint',
        description: 'Test endpoint for width validation',
        parameters: [
            { name: 'param1', type: 'string', description: 'Test parameter 1', required: true },
            { name: 'param2', type: 'boolean', description: 'Test parameter 2', required: false }
        ]
    }
];

try {
    // Генерируем тестовый API
    generator.generateAPI('Test API', testEndpoints, 'InteractiveTestAPI');

    console.log('✅ Генерация завершена успешно!');
    console.log('\n📋 Проверьте:');
    console.log('1. Файл docs/en/api/test.md должен иметь layout: page');
    console.log('2. Компонент InteractiveTestAPI.vue создан');
    console.log('3. Навигация обновлена');

    console.log('\n🔍 Для проверки ширины:');
    console.log('1. Запустите npm run dev');
    console.log('2. Откройте /en/api/test');
    console.log('3. Сравните ширину с /en/api/spot');
    console.log('4. Проверьте, что поля аутентификации помещаются');

} catch (error) {
    console.error('❌ Ошибка при генерации:', error.message);
    process.exit(1);
}

console.log('\n🎉 Все исправления swagger-generator внесены!'); 