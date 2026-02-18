# Rare Diamond Backend 💎

Rare Diamond is a professional-grade Node.js backend for diamond marketplaces. It features real-time inventory synchronization from multiple sources (CSV, API, FTP), buyer/supplier dashboards, and secure Razorpay payment integration.

---

## 🚀 Key Features

- **Multi-Source Inventory Sync**: 
  - 🔄 **API Sync**: Real-time integration with supplier feeds (including Google Sheets support).
  - 📂 **CSV Bulk Upload**: High-performance streaming upload with field mapping.
  - 📡 **FTP Sync**: Scheduled inventory updates via supplier FTP servers.
- **Dynamic Field Mapping**: Map external supplier data fields to internal `Diamond` schema in real-time.
- **Order Management**: Complete flow from Cart to Payment Verification with Razorpay.
- **Role-Based Access (RBAC)**: Distinct permissions for `Admin`, `Supplier`, and `Buyer`.
- **Real-time Notifications**: Socket.IO integration for inventory and order updates.
- **Reporting Dashboard**: Supplier-specific metrics (Monthly Revenue, Orders Today, Best Sellers).

---

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.1+)
- **Database**: MongoDB (Mongoose v8.18+)
- **Real-time**: Socket.IO
- **Payments**: Razorpay
- **Scheduling**: Node-cron
- **Files**: CSV-parser, Basic-FTP

---

## 🏃 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Razorpay Account (for payments)

### 📦 Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd craticBackend-main
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### ⚙️ Environment Setup
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
NODE_ENV=development
```   

### 🚀 Running the App
- **Development**: `npm run dev` (starts with nodemon)
- **Production**: `npm start`

---

## 📡 API Endpoints (Quick Reference)

### Auth
- `POST /api/auth/register` - Create new account.
- `POST /api/auth/login` - Authenticate and get token.

### Inventory
- `GET /api/inventory` - Search/Filter diamonds (Paginated).
- `POST /api/inventory/upload-csv` - Sync via CSV file.
- `POST /api/inventory/sync-api` - Sync via External API/Google Sheet.

### Orders
- `POST /api/orders` - Create order & get Razorpay ID.
- `POST /api/orders/verify-payment` - Confirm signature & complete order.

---

## 🧪 Testing & Deployment

### Testing
- Currently, tests can be manually verified using Postman or insomnia.
- Recommended: `npm test` (to be implemented).

### Deployment
This backend is optimized for deployment on:
- **Vercel**: `vercel.json` is included for serverless deployment.
- **Render/Heroku**: Standard Node.js environment.

---

## 📄 License
This project is licensed under the ISC License.
