# Rare Diamond Backend - Comprehensive Audit Report

## 1. Project Purpose & Overview
This project, named **Rare Diamond**, is a specialized B2B and B2C marketplace for the diamond industry. It bridges the gap between **Suppliers** (sellers) and **Buyers** (customers) with a central **Admin** managing the ecosystem.

### Unique Value Proposition
Unlike standard e-commerce, this platform handles high-frequency inventory updates through multiple channels:
- **Manual Entry**: For small scale adds.
- **CSV Upload**: Bulk updates with field mapping.
- **API Sync**: Real-time integration with external supplier feeds.
- **FTP Sync**: Scheduled sync with supplier servers.

---

## 2. Architecture & Tech Stack

### Architecture: MVC-S Pattern
The project follows a robust **Model-View-Controller-Service** architecture:
- **Models**: Mongoose schemas defining data structure.
- **Routes**: API endpoint definitions.
- **Controllers**: Request handling and response coordination.
- **Services**: Heavy business logic (Inventory sync, FTP processing).
- **Middleware**: Authentication, role-based access, and file handling.

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Real-time**: Socket.IO (for sync notifications)
- **Payment**: Razorpay
- **Scheduling**: Node-cron
- **File Processing**: CSV-parser, Basic-FTP

---

## 3. API & Feature Inventory

### Authentication (`/api/auth`)
- `POST /register`: User signup with role selection.
- `POST /login`: JWT-based authentication.
- `GET /me`: Fetch current user profile.

### Inventory (`/api/inventory`)
- `POST /upload-csv`: Bulk inventory upload with mapping support.
- `POST /sync-api`: Connect to external diamond feeds.
- `POST /sync-ftp`: Connect to supplier FTP servers.
- `GET /`: Paginated diamond search with filters (carat, shape, price).
- `GET /supplier-diamonds`: Supplier-specific inventory view.

### Orders (`/api/orders`)
- `POST /`: Create order and initiate Razorpay payment.
- `POST /verify-payment`: Secure signature verification.
- `GET /my-orders`: Buyer purchase history.
- `GET /seller-orders`: Supplier sales tracking.

### Dashboard (`/api/dashboard`)
- `GET /supplier`: Analytics for sellers (Revenue, Stock, Monthly Sales).

---

## 4. Request Flow
1. **Client**: Sends request with JWT token.
2. **Middleware**: `authMiddleware.js` verifies token and checks roles.
3. **Route**: Matches endpoint in `routes/`.
4. **Controller**: Validates input, calls relevant service.
5. **Service**: Performs complex operations (e.g., fetching FTP file, mapping CSV).
6. **Database**: Updates MongoDB via Mongoose.
7. **Response**: Returns JSON and emits Socket.IO event for UI updates.

---

## 5. Security & Best Practices Audit

### Strengths
- **Role-Based Access Control (RBAC)**: Clear distinction between Admin, Buyer, and Supplier.
- **Hash Hashing**: Uses `bcryptjs` for passwords.
- **Decoupled Logic**: Services handle the "heavy lifting," keeping controllers slim.

### Weaknesses & Security Concerns
-  
- **Direct Credentials in Request**: The FTP sync API takes credentials in the request body. These should be encrypted or stored in the database once, not passed every time.
- **Error Handling**: `express-async-handler` is used, but some catch blocks in services might mask errors from the client.
- **Token Expiry**: Default JWT expiry needs to be confirmed in environment variables.

---

## 6. Implementation Roadmap

### Phase 1: Security Hardening (Current Week)
1. Move all Razorpay and FTP credentials to a vault/secured DB fields.
2. Implement rate limiting to prevent brute-force on Auth endpoints.
3. Standardize API response formats across all controllers.

### Phase 2: Feature Completion (Next 2 Weeks)
1. **Notification Backend**: Finalize the notification logic for buyers when price drops.
2. **Advanced Search**: Add "Range" filters for carat and price.
3. **Refund Logic**: Extensive testing of the `cancelOrderAndRefund` flow.

### Phase 3: Scaling (Month 1)
1. Implement Redis caching for the Diamond Search API.
2. Optimize bulk operations in `inventoryService.js` using MongoDB `unordered` bulk writes.

---

## 7. Performance & Scalability
- **Performance**: The use of `Stream` for CSV processing is excellent for memory efficiency.
- **Scalability**: The backend is ready for containerization (Docker). The use of MongoDB allows for horizontal scaling.
