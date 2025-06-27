import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
    // Base JavaScript rules
    js.configs.recommended,

    // Vue 3 rules
    ...pluginVue.configs['flat/essential'],

    // Node.js files configuration
    {
        files: ['**/*.cjs'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',
            globals: {
                require: 'readonly',
                module: 'readonly',
                process: 'readonly',
                console: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                Buffer: 'readonly',
                global: 'readonly'
            }
        },
        rules: {
            'no-console': 'off',
            'no-unused-vars': 'warn'
        }
    },

    // Node.js .js files configuration
    {
        files: ['swagger-generator.js', 'template-new-component.js'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'script',
            globals: {
                require: 'readonly',
                module: 'readonly',
                process: 'readonly',
                console: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                Buffer: 'readonly',
                global: 'readonly'
            }
        },
        rules: {
            'no-console': 'off',
            'no-unused-vars': 'warn',
            'no-undef': 'warn'
        }
    },

    {
        files: ['**/*.vue', '**/*.js', '**/*.ts'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                // Browser globals
                window: 'readonly',
                document: 'readonly',
                console: 'readonly',
                fetch: 'readonly',
                FormData: 'readonly',
                localStorage: 'readonly',
                URLSearchParams: 'readonly',
                navigator: 'readonly',
                alert: 'readonly',
                setTimeout: 'readonly',
                event: 'readonly',
                // Node.js globals
                process: 'readonly',
                Buffer: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly'
            }
        },
        rules: {
            // Vue specific rules
            'vue/multi-word-component-names': 'off',
            'vue/no-unused-vars': 'warn',

            // JavaScript rules
            'no-console': 'warn',
            'no-debugger': 'warn',
            'no-unused-vars': 'warn',
            'prefer-const': 'warn',
            'no-var': 'error',
            'no-useless-escape': 'warn',
            'no-undef': 'warn'
        }
    },

    {
        ignores: [
            'node_modules/**',
            'dist/**',
            '.vitepress/dist/**',
            '.vitepress/cache/**',
            'docs/.vitepress/dist/**',
            'docs/.vitepress/cache/**',
            '*.min.js',
            'docs/.vitepress/config.ts',
            'docs/.vitepress/components/**/*.vue',
            'merge_swagger.js',
            'swagger-generator-backup.cjs',
            'swagger-generator.cjs',
            'swagger-generator.js',
            'template-new-component.js',
            'docs/.vitepress/theme/components/Interactive*.vue',
            'temp_backup/**',
            'temp_build/**'
        ]
    }
] 