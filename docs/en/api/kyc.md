# KYC API

Know Your Customer (KYC) API for identity verification.

## Base URL
```
https://develop.okd.finance/api
```

## Endpoints

### POST /kyc/submit
Submit KYC documents for verification.

```bash
curl -X POST "https://develop.okd.finance/api/kyc/submit" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "nationality": "US"
  }'
```

### GET /kyc/status
Get KYC verification status.

```bash
curl -X GET "https://develop.okd.finance/api/kyc/status" \
  -H "Authorization: Bearer YOUR_TOKEN"
```
