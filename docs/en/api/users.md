# Users API

User management and profile operations.

## Endpoints

### GET /users/profile
Get user profile information.

### PUT /users/profile
Update user profile.

### GET /users/settings
Get user settings.

### PUT /users/settings
Update user settings.

### POST /users/avatar
Upload user avatar.

## Profile Fields

- firstName, lastName
- email, phone
- timezone, language
- notification preferences

## Examples

```bash
# Get profile
curl -X GET "https://api.okd.finance/users/profile" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"

# Update profile
curl -X PUT "https://api.okd.finance/users/profile" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"firstName": "John", "lastName": "Doe"}'
``` 