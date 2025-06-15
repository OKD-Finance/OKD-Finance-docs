# KYC API

Know Your Customer verification endpoints.

## Endpoints

### GET /kyc/status
Get current KYC verification status.

### POST /kyc/documents
Upload verification documents.

### GET /kyc/requirements
Get KYC requirements for user's region.

### POST /kyc/submit
Submit KYC application for review.

## KYC Levels

### Level 1 - Basic
- Email verification
- Phone verification
- Basic profile information

### Level 2 - Standard  
- Government ID upload
- Address verification
- Selfie verification

### Level 3 - Advanced
- Enhanced due diligence
- Source of funds verification
- Higher transaction limits

## Document Types

- Government ID (passport, driver's license)
- Proof of address (utility bill, bank statement)
- Selfie with ID
- Additional documents as required

## Examples

```bash
# Check KYC status
curl -X GET "https://api.okd.finance/kyc/status" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Upload document
curl -X POST "https://api.okd.finance/kyc/documents" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "type=government_id" \
  -F "file=@passport.jpg"
``` 