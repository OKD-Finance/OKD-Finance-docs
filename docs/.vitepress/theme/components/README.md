# API Testing Components

This directory contains Vue.js components for interactive API testing across different API sections of the OKD Finance platform.

## Component Structure

### Core Components

1. **`ApiTester.vue`** - Legacy Users API tester (original)
2. **`InteractiveAPI.vue`** - Modern 3-column interactive API documentation layout

### Specialized API Testers

1. **`AuthenticationTester.vue`** - Authentication API endpoints
   - User registration (`POST /auth/sign-up`)
   - User login (`POST /auth/sign-in`) 
   - Token refresh (`POST /auth/refresh`)
   - Get profile (`GET /auth/profile`)

2. **`WalletsTester.vue`** - Wallets API endpoints
   - Get all balances (`GET /wallets/balance`)
   - Get specific balance (`GET /wallets/balance/{currency}`)
   - Generate deposit address (`POST /wallets/address`)
   - Get all addresses (`GET /wallets/addresses`)
   - Get deposits (`GET /wallets/deposits`)

3. **`TradingTester.vue`** - Trading API endpoints
   - Place order (`POST /trading/order`)
   - Get orders (`GET /trading/orders`)
   - Get specific order (`GET /trading/orders/{orderId}`)
   - Cancel order (`DELETE /trading/orders/{orderId}`)
   - Cancel all orders (`DELETE /trading/orders`)
   - Get trade history (`GET /trading/trades`)

4. **`KycTester.vue`** - KYC API endpoints
   - Submit KYC documents (`POST /kyc/submit`)
   - Get KYC status (`GET /kyc/status`)
   - Upload documents (`POST /kyc/upload`)
   - Get KYC history (`GET /kyc/history`)

## Usage in Documentation

To use these components in your API documentation pages:

```vue
<template>
  <div>
    <!-- Your documentation content -->
    
    <!-- Include the appropriate tester -->
    <AuthenticationTester />
    <!-- or -->
    <WalletsTester />
    <!-- or -->
    <TradingTester />
    <!-- or -->
    <KycTester />
  </div>
</template>

<script setup>
import AuthenticationTester from '../.vitepress/theme/components/AuthenticationTester.vue'
// import WalletsTester from '../.vitepress/theme/components/WalletsTester.vue'
// import TradingTester from '../.vitepress/theme/components/TradingTester.vue'
// import KycTester from '../.vitepress/theme/components/KycTester.vue'
</script>
```

## Features

Each component includes:

- **API Key Management**: Secure token input with show/hide functionality
- **Real API Testing**: Live requests to `https://develop.okd.finance/api`
- **Fingerprint Generation**: Automatic 32-character hex fingerprint for security
- **cURL Export**: Copy ready-to-use cURL commands
- **Response Display**: Formatted JSON responses with status codes
- **Error Handling**: Network error handling and display
- **Responsive Design**: Mobile-friendly layouts

## API Configuration

All components are configured to work with:
- **Base URL**: `https://develop.okd.finance/api`
- **Authentication**: Bearer token in Authorization header
- **Fingerprint**: Auto-generated 32-character hex string
- **Content-Type**: `application/json` for POST/PUT requests

## Extending

To create a new API tester component:

1. Copy one of the existing tester components
2. Update the component name and API endpoints
3. Modify the form fields for your specific API parameters
4. Update the methods to handle your API's request/response format
5. Add appropriate styling and validation

## File Structure

```
docs/.vitepress/theme/components/
├── README.md                    # This documentation
├── ApiTester.vue               # Legacy Users API tester
├── InteractiveAPI.vue          # Modern 3-column layout
├── AuthenticationTester.vue    # Authentication API
├── WalletsTester.vue          # Wallets API
├── TradingTester.vue          # Trading API
├── KycTester.vue              # KYC API
└── [Future components...]      # Additional API sections
```

## Development Notes

- All components use Vue 3 Options API for consistency
- API keys are stored in localStorage with key `okd_api_key`
- Components share similar styling using CSS custom properties
- Error handling follows consistent patterns across all components
- cURL generation includes proper escaping and formatting 