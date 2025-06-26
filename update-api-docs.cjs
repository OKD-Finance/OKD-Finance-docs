/* eslint-env node */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * API Documentation Update Script
 * Automatically updates VitePress configuration with generated API endpoints
 */

const CONFIG_FILE = './docs/.vitepress/config.ts';
const SWAGGER_GENERATOR = './swagger-generator.cjs';

// API groups mapping for better organization
const API_GROUP_MAPPING = {
    'authentication': 'Authentication API',
    'spot': 'Spot Trading API',
    'wallet': 'Wallet API',
    'kyc': 'KYC API',
    'user-operations': 'User Operations API',
    'referral-program': 'Referral Program API',
    'exchange-configuration': 'Exchange Configuration API',
    'websocket-subscriptions': 'WebSocket Subscriptions API',
    'datasource': 'Data Source API',
    'bybit-rest-endpoints': 'Bybit REST Endpoints API',
    'managed': 'Managed Services API',
    'okd': 'OKD API',
    'errors': 'Error Handling API'
};

// Generate sidebar items for API endpoints
function generateApiSidebarItems() {
    const items = [
        { text: 'Overview', link: '/en/api/overview' },
        { text: 'Users', link: '/en/api/users' }
    ];

    // Add auto-generated API endpoints
    Object.entries(API_GROUP_MAPPING).forEach(([key, title]) => {
        items.push({
            text: title,
            link: `/en/api/${key}`
        });
    });

    // Add existing manual endpoints
    const existingEndpoints = [
        { text: 'CMC Cases', link: '/en/api/cmc-cases' },
        { text: 'Access Management', link: '/en/api/access-management' },
        { text: 'Withdrawal', link: '/en/api/withdrawal' },
        { text: 'Exchange', link: '/en/api/exchange' },
        { text: 'Spot Order', link: '/en/api/spot-order' },
        { text: 'P2P', link: '/en/api/p2p' },
        { text: 'History', link: '/en/api/history' },
        { text: 'Settings', link: '/en/api/settings' },
        { text: 'Newsfeed', link: '/en/api/newsfeed' },
        { text: 'Notifications', link: '/en/api/notifications' },
        { text: 'Email Templates', link: '/en/api/email-templates' },
        { text: 'Fee Settings', link: '/en/api/fee-settings' },
        { text: 'Analytics', link: '/en/api/analytics' },
        { text: 'Audit', link: '/en/api/audit' },
        { text: 'Support', link: '/en/api/support' }
    ];

    return [...items, ...existingEndpoints];
}

// Update VitePress configuration
function updateVitePressConfig() {
    console.log('📝 Updating VitePress configuration...');

    try {
        let configContent = fs.readFileSync(CONFIG_FILE, 'utf8');

        // Generate new API sidebar items
        const newApiItems = generateApiSidebarItems();
        const apiItemsString = JSON.stringify(newApiItems, null, 24).replace(/"/g, "'");

        // Find and replace the API sidebar section
        const apiSidebarRegex = /\/en\/api\/': \[\s*\{[^}]*text: 'API Reference',[^}]*items: \[[^\]]*\][^}]*\}[^\]]*\]/s;

        const newApiSidebar = `'/en/api/': [
                {
                    text: 'API Reference',
                    items: ${apiItemsString}
                }
            ]`;

        if (apiSidebarRegex.test(configContent)) {
            configContent = configContent.replace(apiSidebarRegex, newApiSidebar);
            console.log('   ✅ Updated existing API sidebar');
        } else {
            console.log('   ⚠️  Could not find API sidebar pattern to replace');
            return false;
        }

        // Write updated configuration
        fs.writeFileSync(CONFIG_FILE, configContent);
        console.log('   ✅ VitePress configuration updated successfully');
        return true;

    } catch (error) {
        console.error('   ❌ Error updating VitePress config:', error.message);
        return false;
    }
}

// Create package.json scripts for automation
function updatePackageJsonScripts() {
    console.log('📦 Updating package.json scripts...');

    try {
        const packageJsonPath = './package.json';
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

        // Add new scripts
        packageJson.scripts = packageJson.scripts || {};
        packageJson.scripts['generate-api-docs'] = 'node swagger-generator.cjs';
        packageJson.scripts['update-api-docs'] = 'node update-api-docs.cjs';
        packageJson.scripts['build-docs'] = 'npm run generate-api-docs && npm run update-api-docs && npm run build';
        packageJson.scripts['dev-docs'] = 'npm run generate-api-docs && npm run update-api-docs && npm run dev';

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log('   ✅ Package.json scripts updated');

    } catch (error) {
        console.error('   ❌ Error updating package.json:', error.message);
    }
}

// Create GitHub Actions workflow for automated documentation updates
function createGitHubWorkflow() {
    console.log('🔄 Creating GitHub Actions workflow...');

    const workflowDir = './.github/workflows';
    const workflowFile = path.join(workflowDir, 'update-api-docs.yml');

    const workflowContent = `name: Update API Documentation

on:
  schedule:
    # Run every 6 hours to check for API changes
    - cron: '0 */6 * * *'
  workflow_dispatch:
    # Allow manual triggering
  push:
    branches: [ main ]
    paths:
      - 'swagger-generator.cjs'
      - 'update-api-docs.cjs'

jobs:
  update-docs:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout repository
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Generate API documentation
      run: |
        npm run generate-api-docs
        npm run update-api-docs
        
    - name: Check for changes
      id: changes
      run: |
        git diff --quiet || echo "changes=true" >> $GITHUB_OUTPUT
        
    - name: Commit and push changes
      if: steps.changes.outputs.changes == 'true'
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add .
        git commit -m "docs: auto-update API documentation from Swagger"
        git push
        
    - name: Build and deploy
      if: steps.changes.outputs.changes == 'true'
      run: |
        npm run build
        npm run deploy
`;

    try {
        if (!fs.existsSync(workflowDir)) {
            fs.mkdirSync(workflowDir, { recursive: true });
        }

        fs.writeFileSync(workflowFile, workflowContent);
        console.log('   ✅ GitHub Actions workflow created');

    } catch (error) {
        console.error('   ❌ Error creating GitHub workflow:', error.message);
    }
}

// Create documentation for the automated system
function createDocumentation() {
    console.log('📚 Creating automation documentation...');

    const docContent = `# API Documentation Automation

This system automatically generates and updates API documentation from the Swagger API definition.

## How It Works

1. **Swagger Generator** (\`swagger-generator.cjs\`): Fetches the latest Swagger API definition from \`https://develop.okd.finance/api/swagger/swagger.json\` and generates:
   - Interactive Vue components for each API group
   - Markdown documentation files
   - Complete parameter and response documentation

2. **Configuration Updater** (\`update-api-docs.cjs\`): Updates the VitePress configuration to include all generated API endpoints in the sidebar navigation.

3. **GitHub Actions Workflow**: Automatically runs every 6 hours to check for API changes and updates documentation.

## Available Scripts

- \`npm run generate-api-docs\` - Generate API documentation from Swagger
- \`npm run update-api-docs\` - Update VitePress configuration with new endpoints
- \`npm run build-docs\` - Full build process with API generation
- \`npm run dev-docs\` - Development server with API generation

## Generated API Groups

${Object.entries(API_GROUP_MAPPING).map(([key, title]) =>
        `- **${title}** (\`/en/api/${key}\`) - Auto-generated from Swagger`
    ).join('\n')}

## Manual Updates

To manually update the API documentation:

\`\`\`bash
# Generate new documentation from Swagger API
npm run generate-api-docs

# Update VitePress configuration
npm run update-api-docs

# Build and test
npm run build
\`\`\`

## Customization

### Adding New API Groups

Edit the \`API_GROUP_MAPPING\` in \`update-api-docs.cjs\` to add or modify API group names and titles.

### Modifying Templates

Edit the \`generateVueComponent\` function in \`swagger-generator.cjs\` to customize the generated Vue component templates.

### Changing Update Frequency

Modify the cron schedule in \`.github/workflows/update-api-docs.yml\` to change how often the documentation is updated.

## Troubleshooting

1. **API Generation Fails**: Check if the Swagger API is accessible at \`https://develop.okd.finance/api/swagger/swagger.json\`
2. **Build Errors**: Ensure all generated Vue components have valid syntax
3. **Navigation Issues**: Verify the VitePress configuration was updated correctly

## Architecture

\`\`\`
Swagger API → swagger-generator.cjs → Vue Components + Markdown
                                   ↓
VitePress Config ← update-api-docs.cjs ← Generated Files
                                   ↓
                              GitHub Actions → Auto Deploy
\`\`\`
`;

    try {
        fs.writeFileSync('./API_AUTOMATION.md', docContent);
        console.log('   ✅ Automation documentation created');

    } catch (error) {
        console.error('   ❌ Error creating documentation:', error.message);
    }
}

// Main execution
async function main() {
    console.log('🚀 Starting API documentation automation setup...\n');

    try {
        // Step 1: Generate API documentation
        console.log('1️⃣ Generating API documentation from Swagger...');
        execSync(`node ${SWAGGER_GENERATOR}`, { stdio: 'inherit' });

        // Step 2: Update VitePress configuration
        console.log('\n2️⃣ Updating VitePress configuration...');
        const configUpdated = updateVitePressConfig();

        // Step 3: Update package.json scripts
        console.log('\n3️⃣ Setting up automation scripts...');
        updatePackageJsonScripts();

        // Step 4: Create GitHub Actions workflow
        console.log('\n4️⃣ Creating GitHub Actions workflow...');
        createGitHubWorkflow();

        // Step 5: Create documentation
        console.log('\n5️⃣ Creating automation documentation...');
        createDocumentation();

        console.log('\n🎉 API documentation automation setup complete!');
        console.log('\n📋 Summary:');
        console.log(`   📦 Generated ${Object.keys(API_GROUP_MAPPING).length} API groups`);
        console.log(`   📝 Updated VitePress configuration: ${configUpdated ? '✅' : '❌'}`);
        console.log('   🔄 Created GitHub Actions workflow');
        console.log('   📚 Created automation documentation');

        console.log('\n🔧 Available commands:');
        console.log('   npm run generate-api-docs  - Generate from Swagger');
        console.log('   npm run update-api-docs    - Update configuration');
        console.log('   npm run build-docs         - Full build with generation');
        console.log('   npm run dev-docs           - Dev server with generation');

        console.log('\n📖 Read API_AUTOMATION.md for detailed documentation');

    } catch (error) {
        console.error('❌ Error during setup:', error.message);
        process.exit(1);
    }
}

// Export functions for use in other scripts
module.exports = {
    updateVitePressConfig,
    updatePackageJsonScripts,
    createGitHubWorkflow,
    createDocumentation,
    generateApiSidebarItems,
    API_GROUP_MAPPING
};

// Run if called directly
if (require.main === module) {
    main();
} 