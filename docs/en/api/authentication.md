# Authentication API

API endpoints for user authentication and authorization.

## Base URL
```
https://api.okd.finance
```

## Endpoints

### POST /auth/register
Register new user with Firebase token.

### POST /auth/login  
Login user and get JWT token.

### POST /auth/refresh
Refresh JWT token.

### GET /auth/me
Get current user information.

### POST /auth/logout
Logout user.

## Authentication Flow

1. Authenticate with Firebase
2. Exchange Firebase token for JWT
3. Use JWT for API requests
4. Refresh JWT when needed

## Rate Limits

- Registration: 5 requests/hour
- Login: 10 requests/5 minutes
- Other: 1000 requests/hour

For detailed examples, see [Basic Usage](/en/examples/basic-usage). 