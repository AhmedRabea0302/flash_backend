# Node.js Server

This Node.js server provides three endpoints:

1. `/health`: Checks the health of the server.
2. `/v1/auth/token`: Takes the credentials of a user sent in headers and generates a token if the user has the right credentials.
3. `/v1/orders`: Calls the orders service and retrieves the order status.

## Endpoints

### 1. /health

**Method**: GET

**Description**: Checks the health of the server.

**Response**:
- Status code: 200
- Body: `{ "status": 200, "message":"Up and running" }`

### 2. /v1/auth/token

**Method**: POST

**Description**: Takes the credentials of a user sent in headers and generates a token if the user has the right credentials.

**Headers**:
- `Authorization`: `Bearer CLIENT_ID:CLIENT_SECRET`

**Response**:
- Status code: 200
- Body: `{ "token": "your_generated_token" }`

**Response (Invalid Credentials)**:
- Status code: 401
- Body: `{ "error": "Invalid client credentials." }`

### 3. /v1/orders

**Method**: POST

**Description**: Calls the orders service and retrieves the order status.

**Response**:
- Status code: 200
- Body: `{ "order":  {
            "integrationId": 58328228,
            "aggregatorOrderId": "94fd204c-4f44-477a-8339-471cf6ed41f2",   
            "description": "Order for product xyz",
            "customer": {
                "phone": "+20100456432222"
            },
            "amountCents": 5000,
            "currency": "EGP",
            "status": "completed"
        }
  }`

## Installation

Clone the repository:
   ```bash
   git clone -b master git@github.com:AhmedRabea0302/flash_backend.git
   cd flash_backend
   npm install
   npm start dev
