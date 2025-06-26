# API Documentation Automation

This system automatically generates and updates API documentation from the Swagger API definition.

## Configuration

The system can be configured using environment variables:

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `SWAGGER_URL` | URL for Swagger API definition | `https://develop.okd.finance/api/swagger/swagger.json` |
| `API_BASE_URL` | Base URL for API testing in components | `https://develop.okd.finance/api` |

Create a `.env` file in the root directory to customize these values:

```bash
# .env
SWAGGER_URL=https://your-api.com/swagger/swagger.json
API_BASE_URL=https://your-api.com/api
```

## How It Works

1. **Swagger Generator** (`swagger-generator.cjs`): Fetches the latest Swagger API definition from the configured `SWAGGER_URL` and generates:
   - Interactive Vue components for each API group
   - Markdown documentation files
   - Complete parameter and response documentation

2. **Configuration Updater** (`update-api-docs.cjs`): Updates the VitePress configuration to include all generated API endpoints in the sidebar navigation.

3. **GitHub Actions Workflow**: Automatically runs every 6 hours to check for API changes and updates documentation.

## Available Scripts

- `npm run generate-api-docs` - Generate API documentation from Swagger
- `npm run update-api-docs` - Update VitePress configuration with new endpoints
- `npm run build-docs` - Full build process with API generation
- `npm run dev-docs` - Development server with API generation

## Generated API Groups

- **Authentication API** (`/en/api/authentication`) - Auto-generated from Swagger
- **Spot Trading API** (`/en/api/spot`) - Auto-generated from Swagger
- **Wallet API** (`/en/api/wallet`) - Auto-generated from Swagger
- **KYC API** (`/en/api/kyc`) - Auto-generated from Swagger
- **User Operations API** (`/en/api/user-operations`) - Auto-generated from Swagger
- **Referral Program API** (`/en/api/referral-program`) - Auto-generated from Swagger
- **Exchange Configuration API** (`/en/api/exchange-configuration`) - Auto-generated from Swagger
- **WebSocket Subscriptions API** (`/en/api/websocket-subscriptions`) - Auto-generated from Swagger
- **Data Source API** (`/en/api/datasource`) - Auto-generated from Swagger
- **Bybit REST Endpoints API** (`/en/api/bybit-rest-endpoints`) - Auto-generated from Swagger
- **Managed Services API** (`/en/api/managed`) - Auto-generated from Swagger
- **OKD API** (`/en/api/okd`) - Auto-generated from Swagger
- **Error Handling API** (`/en/api/errors`) - Auto-generated from Swagger

## Manual Updates

To manually update the API documentation:

```bash
# Generate new documentation from Swagger API
npm run generate-api-docs

# Update VitePress configuration
npm run update-api-docs

# Build and test
npm run build
```

## Customization

### Adding New API Groups

Edit the `API_GROUP_MAPPING` in `update-api-docs.cjs` to add or modify API group names and titles.

### Modifying Templates

Edit the `generateVueComponent` function in `swagger-generator.cjs` to customize the generated Vue component templates.

### Changing Update Frequency

Modify the cron schedule in `.github/workflows/update-api-docs.yml` to change how often the documentation is updated.

## Troubleshooting

1. **API Generation Fails**: 
   - Check if the Swagger API is accessible at your configured `SWAGGER_URL`
   - Verify environment variables are properly set
   - Ensure `.env` file exists if using custom configuration
2. **Build Errors**: Ensure all generated Vue components have valid syntax
3. **Navigation Issues**: Verify the VitePress configuration was updated correctly
4. **Environment Configuration Issues**:
   - Check if `dotenv` is installed: `npm install --save-dev dotenv`
   - Verify `.env` file format (no spaces around `=`)
   - Ensure environment variables are properly exported if not using `.env` file

## Architecture

```
Swagger API → swagger-generator.cjs → Vue Components + Markdown
                                   ↓
VitePress Config ← update-api-docs.cjs ← Generated Files
                                   ↓
                              GitHub Actions → Auto Deploy
```
