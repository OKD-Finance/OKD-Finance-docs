# API KYC (Верификация)

API для управления процессом верификации пользователей (Know Your Customer) в системе OKD Finance.

## Обзор KYC

Система KYC обеспечивает соответствие регулятивным требованиям и включает:
- Верификацию личности
- Проверку документов
- Верификацию адреса
- Проверку источника средств
- Мониторинг транзакций

## Уровни верификации

### Уровень 0 - Базовая регистрация
- Только email верификация
- Лимит торговли: $1,000/день
- Лимит вывода: $100/день

### Уровень 1 - Базовая верификация
- Документ, удостоверяющий личность
- Селфи с документом
- Лимит торговли: $50,000/день
- Лимит вывода: $10,000/день

### Уровень 2 - Полная верификация
- Подтверждение адреса
- Источник средств
- Лимит торговли: $500,000/день
- Лимит вывода: $100,000/день

### Уровень 3 - Институциональная верификация
- Корпоративные документы
- Бенефициарные владельцы
- Неограниченные лимиты

## Получение статуса KYC

### Текущий статус пользователя

```http
GET /api/v1/kyc/status
``` -->

```javascript
const kycStatus = await okdFinance.getKYCStatus();
console.log(kycStatus);
``` -->

**Ответ:**
```json
{
  "userId": "12345",
  "currentLevel": 1,
  "maxLevel": 2,
  "status": "approved",
  "verifications": {
    "email": {
      "status": "approved",
      "verifiedAt": "2024-12-01T10:00:00Z"
    },
    "phone": {
      "status": "approved",
      "verifiedAt": "2024-12-01T10:05:00Z"
    },
    "identity": {
      "status": "approved",
      "verifiedAt": "2024-12-01T12:00:00Z",
      "documentType": "passport",
      "documentNumber": "AB1234567",
      "expiryDate": "2030-12-01"
    },
    "address": {
      "status": "pending",
      "submittedAt": "2024-12-01T14:00:00Z"
    }
  },
  "limits": {
    "trading": {
      "daily": "50000.00",
      "monthly": "1000000.00"
    },
    "withdrawal": {
      "daily": "10000.00",
      "monthly": "200000.00"
    }
  },
  "nextLevelRequirements": [
    "address_verification",
    "source_of_funds"
  ]
}
``` -->

### История верификации

```http
GET /api/v1/kyc/history
``` -->

```javascript
const kycHistory = await okdFinance.getKYCHistory();
console.log(kycHistory);
``` -->

## Верификация личности

### Загрузка документа

```http
POST /api/v1/kyc/identity/document
``` -->

```javascript
const formData = new FormData();
formData.append('documentType', 'passport');
formData.append('documentFront', frontImageFile);
formData.append('documentBack', backImageFile); // для ID карт
formData.append('country', 'US');

const identitySubmission = await okdFinance.submitIdentityDocument(formData);
``` -->

**Параметры:**
| Параметр | Тип | Описание |
|----------|-----|----------|
| `documentType` | string | passport, id_card, driving_license |
| `documentFront` | file | Фото лицевой стороны |
| `documentBack` | file | Фото обратной стороны (если требуется) |
| `country` | string | Код страны (ISO 3166-1 alpha-2) |

**Ответ:**
```json
{
  "submissionId": "kyc_doc_12345",
  "status": "pending",
  "documentType": "passport",
  "country": "US",
  "submittedAt": "2024-12-20T10:30:00Z",
  "estimatedProcessingTime": "24-48 hours",
  "requirements": {
    "imageQuality": "high",
    "documentVisible": true,
    "noGlare": true,
    "allCornersVisible": true
  }
}
``` -->

### Селфи верификация

```http
POST /api/v1/kyc/identity/selfie
``` -->

```javascript
const selfieData = new FormData();
selfieData.append('selfie', selfieImageFile);
selfieData.append('submissionId', 'kyc_doc_12345');

const selfieSubmission = await okdFinance.submitSelfie(selfieData);
``` -->

**Требования к селфи:**
- Четкое изображение лица
- Хорошее освещение
- Лицо должно занимать 60-80% кадра
- Без головных уборов и солнцезащитных очков
- Нейтральное выражение лица

### Проверка статуса документа

```http
GET /api/v1/kyc/identity/status/{submissionId}
``` -->

```javascript
const documentStatus = await okdFinance.getDocumentStatus('kyc_doc_12345');
console.log(documentStatus);
``` -->

**Возможные статусы:**
- `pending` - На рассмотрении
- `processing` - Обрабатывается
- `approved` - Одобрено
- `rejected` - Отклонено
- `expired` - Истек срок действия

## Верификация адреса

### Загрузка документа адреса

```http
POST /api/v1/kyc/address/document
``` -->

```javascript
const addressData = new FormData();
addressData.append('documentType', 'utility_bill');
addressData.append('document', addressDocumentFile);
addressData.append('address', JSON.stringify({
  street: '123 Main Street',
  city: 'New York',
  state: 'NY',
  postalCode: '10001',
  country: 'US'
}));

const addressSubmission = await okdFinance.submitAddressDocument(addressData);
``` -->

**Принимаемые документы:**
- Счет за коммунальные услуги
- Банковская выписка
- Налоговая декларация
- Договор аренды
- Справка из банка

**Требования:**
- Документ не старше 3 месяцев
- Четко видны имя и адрес
- Официальный бланк организации

### Верификация через банковский перевод

```http
POST /api/v1/kyc/address/bank-verification
``` -->

```javascript
const bankVerification = await okdFinance.initiateBankAddressVerification({
  bankAccount: {
    accountNumber: '1234567890',
    routingNumber: '021000021',
    accountHolderName: 'John Doe',
    bankName: 'Chase Bank'
  },
  address: {
    street: '123 Main Street',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US'
  }
});
``` -->

## Верификация источника средств

### Декларация источника средств

```http
POST /api/v1/kyc/source-of-funds
``` -->

```javascript
const sourceOfFunds = await okdFinance.submitSourceOfFunds({
  primarySource: 'employment',
  employmentDetails: {
    employer: 'Tech Company Inc.',
    position: 'Software Engineer',
    annualIncome: '100000',
    employmentStartDate: '2020-01-01'
  },
  additionalSources: [
    {
      type: 'investment',
      description: 'Stock market investments',
      estimatedValue: '50000'
    }
  ],
  supportingDocuments: ['employment_letter', 'pay_stub', 'tax_return']
});
``` -->

**Типы источников средств:**
- `employment` - Трудовая деятельность
- `business` - Собственный бизнес
- `investment` - Инвестиции
- `inheritance` - Наследство
- `gift` - Подарок
- `savings` - Накопления
- `other` - Другое

### Загрузка подтверждающих документов

```http
POST /api/v1/kyc/source-of-funds/documents
``` -->

```javascript
const documentsData = new FormData();
documentsData.append('documentType', 'employment_letter');
documentsData.append('document', employmentLetterFile);
documentsData.append('submissionId', 'sof_12345');

const documentUpload = await okdFinance.uploadSourceOfFundsDocument(documentsData);
``` -->

## Корпоративная верификация

### Регистрация корпоративного аккаунта

```http
POST /api/v1/kyc/corporate/register
``` -->

```javascript
const corporateRegistration = await okdFinance.registerCorporateAccount({
  companyInfo: {
    legalName: 'Tech Solutions LLC',
    registrationNumber: '12345678',
    taxId: '98-7654321',
    incorporationDate: '2020-01-15',
    incorporationCountry: 'US',
    businessType: 'technology',
    website: 'https://techsolutions.com'
  },
  registeredAddress: {
    street: '456 Business Ave',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'US'
  },
  businessAddress: {
    street: '456 Business Ave',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94105',
    country: 'US'
  }
});
``` -->

### Добавление бенефициарных владельцев

```http
POST /api/v1/kyc/corporate/beneficial-owners
``` -->

```javascript
const beneficialOwner = await okdFinance.addBeneficialOwner({
  personalInfo: {
    firstName: 'John',
    lastName: 'Smith',
    dateOfBirth: '1980-05-15',
    nationality: 'US',
    placeOfBirth: 'New York, US'
  },
  ownershipPercentage: 25.5,
  position: 'CEO',
  address: {
    street: '789 Executive Blvd',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'US'
  },
  identityDocument: {
    type: 'passport',
    number: 'AB1234567',
    expiryDate: '2030-05-15',
    issuingCountry: 'US'
  }
});
``` -->

### Загрузка корпоративных документов

```http
POST /api/v1/kyc/corporate/documents
``` -->

```javascript
const corporateDocuments = new FormData();
corporateDocuments.append('documentType', 'certificate_of_incorporation');
corporateDocuments.append('document', incorporationCertificateFile);

const corpDocUpload = await okdFinance.uploadCorporateDocument(corporateDocuments);
``` -->

**Требуемые документы:**
- Свидетельство о регистрации
- Устав компании
- Справка о директорах
- Справка об акционерах
- Лицензии (если применимо)

## Мониторинг и соответствие

### Проверка санкционных списков

```http
GET /api/v1/kyc/sanctions-check/{userId}
``` -->

```javascript
const sanctionsCheck = await okdFinance.checkSanctions('12345');
console.log(sanctionsCheck);
``` -->

**Ответ:**
```json
{
  "userId": "12345",
  "status": "clear",
  "checkedLists": [
    "OFAC SDN",
    "EU Sanctions",
    "UN Sanctions",
    "PEP Lists"
  ],
  "lastChecked": "2024-12-20T10:30:00Z",
  "nextCheck": "2024-12-21T10:30:00Z"
}
``` -->

### PEP (Politically Exposed Person) проверка

```http
POST /api/v1/kyc/pep-check
``` -->

```javascript
const pepCheck = await okdFinance.checkPEP({
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1980-05-15',
  nationality: 'US'
});
``` -->

### Мониторинг транзакций

```http
GET /api/v1/kyc/transaction-monitoring
``` -->

```javascript
const monitoring = await okdFinance.getTransactionMonitoring({
  userId: '12345',
  period: '30d',
  includeAlerts: true
});
``` -->

**Ответ:**
```json
{
  "userId": "12345",
  "period": "30d",
  "summary": {
    "totalTransactions": 156,
    "totalVolume": "125000.00",
    "averageTransactionSize": "801.28",
    "largestTransaction": "15000.00",
    "flaggedTransactions": 2
  },
  "alerts": [
    {
      "alertId": "alert_123",
      "type": "large_transaction",
      "transactionId": "tx_456",
      "amount": "15000.00",
      "reason": "Exceeds daily average by 300%",
      "status": "investigating",
      "createdAt": "2024-12-19T15:30:00Z"
    }
  ],
  "riskScore": 2.5,
  "riskLevel": "low"
}
``` -->

## Управление документами

### Список загруженных документов

```http
GET /api/v1/kyc/documents
``` -->

```javascript
const documents = await okdFinance.getKYCDocuments();
console.log(documents);
``` -->

### Скачивание документа

```http
GET /api/v1/kyc/documents/{documentId}/download
``` -->

```javascript
const documentBlob = await okdFinance.downloadKYCDocument('doc_12345');
``` -->

### Удаление документа

```http
DELETE /api/v1/kyc/documents/{documentId}
``` -->

```javascript
const result = await okdFinance.deleteKYCDocument('doc_12345');
``` -->

**Примечание:** Удалить можно только документы в статусе `pending` или `rejected`.

## Уведомления и статусы

### Подписка на уведомления KYC

```http
POST /api/v1/kyc/notifications/subscribe
``` -->

```javascript
const subscription = await okdFinance.subscribeToKYCNotifications({
  email: true,
  sms: false,
  push: true,
  webhook: 'https://your-domain.com/kyc-webhook',
  events: [
    'document_approved',
    'document_rejected',
    'level_upgraded',
    'additional_info_required'
  ]
});
``` -->

### Webhook события KYC

```javascript
// Пример обработки KYC webhook
app.post('/kyc-webhook', (req, res) => {
  const { event, data } = req.body;
  
  switch (event) {
    case 'document_approved':
      handleDocumentApproved(data);
      break;
      
    case 'document_rejected':
      handleDocumentRejected(data);
      break;
      
    case 'level_upgraded':
      handleLevelUpgraded(data);
      break;
      
    case 'additional_info_required':
      handleAdditionalInfoRequired(data);
      break;
  }
  
  res.status(200).json({ status: 'received' });
});

function handleDocumentRejected(data) {
  const { userId, documentType, rejectionReason, resubmissionAllowed } = data;
  
  // Уведомить пользователя о причине отклонения
  sendNotification(userId, {
    type: 'document_rejected',
    message: `Документ ${documentType} отклонен: ${rejectionReason}`,
    canResubmit: resubmissionAllowed
  });
}
``` -->

## Административные функции

### Ручная проверка документов (для администраторов)

```http
POST /api/v1/kyc/admin/review
``` -->

```javascript
const reviewResult = await okdFinance.reviewKYCDocument({
  submissionId: 'kyc_doc_12345',
  decision: 'approved', // 'approved', 'rejected', 'pending'
  comments: 'Document verified successfully',
  reviewerId: 'admin_123'
});
``` -->

### Установка лимитов пользователя

```http
POST /api/v1/kyc/admin/limits
``` -->

```javascript
const limitsUpdate = await okdFinance.updateUserLimits({
  userId: '12345',
  limits: {
    trading: {
      daily: '100000.00',
      monthly: '2000000.00'
    },
    withdrawal: {
      daily: '50000.00',
      monthly: '1000000.00'
    }
  },
  reason: 'Enhanced verification completed'
});
``` -->

## Коды ошибок KYC

| Код | Описание |
|-----|----------|
| 2001 | Документ не читается |
| 2002 | Документ просрочен |
| 2003 | Несоответствие данных |
| 2004 | Подозрительный документ |
| 2005 | Требуется дополнительная верификация |
| 2006 | Пользователь в санкционном списке |
| 2007 | Недостаточное качество изображения |
| 2008 | Документ не поддерживается |
| 2009 | Превышен лимит попыток |
| 2010 | Требуется ручная проверка |

### Пример обработки ошибок KYC

```javascript
try {
  const identitySubmission = await okdFinance.submitIdentityDocument(formData);
} catch (error) {
  switch (error.code) {
    case 2001:
      showError('Документ не читается. Пожалуйста, загрузите более четкое изображение.');
      break;
    case 2002:
      showError('Срок действия документа истек. Пожалуйста, предоставьте действующий документ.');
      break;
    case 2007:
      showError('Качество изображения недостаточное. Убедитесь в хорошем освещении и четкости.');
      break;
    default:
      showError('Ошибка загрузки документа: ' + error.message);
  }
}
``` -->

## Интеграция с внешними сервисами

### Интеграция с Jumio

```javascript
const jumioConfig = {
  apiToken: process.env.JUMIO_API_TOKEN,
  apiSecret: process.env.JUMIO_API_SECRET,
  baseUrl: 'https://netverify.com/api/netverify/v2'
};

async function initiateJumioVerification(userId) {
  const jumioSession = await okdFinance.createJumioSession({
    userId: userId,
    successUrl: 'https://your-domain.com/kyc/success',
    errorUrl: 'https://your-domain.com/kyc/error',
    callbackUrl: 'https://your-domain.com/kyc/callback'
  });
  
  return jumioSession.redirectUrl;
}
``` -->

### Интеграция с Onfido

```javascript
const onfidoConfig = {
  apiToken: process.env.ONFIDO_API_TOKEN,
  region: 'EU' // или 'US'
};

async function createOnfidoApplicant(userData) {
  const applicant = await okdFinance.createOnfidoApplicant({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    dob: userData.dateOfBirth,
    address: userData.address
  });
  
  return applicant.id;
}
``` -->
