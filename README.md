
# 🛍 My Ecommerce Backend API

This is the backend for an ecommerce application with authentication, cart, coupon system, orders, and Paymob payment integration.

---

## 🔗 Base URL (Local)
```
http://localhost:3000/api/v1
```

---

## 🔐 Authentication

| Endpoint | Method | Protected | Description |
|----------|--------|-----------|-------------|
| `/auth/register` | POST | ❌ | Register a new user |
| `/auth/verify/:token` | GET | ❌ | Email verification |
| `/auth/login` | POST | ❌ | Login with email & password |
| `/auth/forget-password` | POST | ❌ | Send reset email |
| `/auth/reset-password/:token` | POST | ❌ | Reset password |

---

## 🛒 Cart

| Endpoint | Method | Protected | Description |
|----------|--------|-----------|-------------|
| `/cart` | GET | ✅ | Get current user cart |
| `/cart` | POST | ✅ | Add product to cart |
| `/cart` | PUT | ✅ | Update product quantity |
| `/cart` | DELETE | ✅ | Remove product from cart |
| `/cart/apply-coupon` | POST | ✅ | Apply coupon to cart |

---

## 💳 Payment (Paymob)

| Endpoint | Method | Protected | Description |
|----------|--------|-----------|-------------|
| `/order/pay` | POST | ✅ | Start payment and get Paymob iframe URL |
| `/order/webhook/paymob` | POST | ❌ | Webhook from Paymob to confirm payment |

### 💡 Paymob `/pay` Endpoint
- Requires `Authorization` header with user token
- Requires cart to exist

#### Request Body Example:
```json
{
  "paymentType": "card" // or "wallet"
}
```

#### Response:
```json
{
  "message": "Redirect to payment",
  "url": "https://accept.paymob.com/api/acceptance/iframes/<iframe_id>?payment_token=...",
  "order": { ... }
}
```

---

## ⚠️ Frontend Notes

- Authorization header is required:
```
Authorization: Bearer <JWT_TOKEN>
```

- Frontend should redirect or embed the `iframe` from `/order/pay` response.

#### Example:
```html
<iframe
  src="https://accept.paymob.com/api/acceptance/iframes/941322?payment_token=..."
  style="width:100%; height:600px; border:none;"
></iframe>
```

- Webhook `/order/webhook/paymob` is automatically triggered after payment to mark orders as `paid`.

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Paymob API Integration
- JWT Authentication
- Multer for file uploads

---

## 📂 How to Run

1. Clone the repo  
   `git clone https://github.com/your-username/ecommerce-backend.git`

2. Install dependencies  
   `npm install`

3. Create `.env` file with:
```env
PORT=3000
DATABASE_LOCAL=mongodb://127.0.0.1:27017/my-ecommerce
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=90d

PAYMOB_API_KEY=...
PAYMOB_HMAC=...
PAYMOB_IFRAME_ID=941322
PAYMOB_CARD_INTEGRATION_ID=5198201
```

4. Run dev server  
   `npm run dev`

---

## ✅ Status
✔️ Complete & ready to hand off to Frontend team.
