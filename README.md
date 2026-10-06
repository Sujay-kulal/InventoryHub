# 📦 InventoryHub — Full-Stack Inventory Management Application

## 📋 Project Overview

**InventoryHub** is a full-stack inventory management application built with **React** (frontend) and **Node.js/Express** (backend). It enables users to manage product inventory through a clean, responsive dashboard with full CRUD (Create, Read, Update, Delete) functionality.

This project was developed as a Coursera peer-graded assignment to demonstrate frontend-backend integration, API design, debugging skills, and performance optimization — with assistance from **Microsoft Copilot** throughout the development lifecycle.

---

## ✨ Features

- **Dashboard** — Real-time summary stats (total products, inventory value, low-stock alerts, category count)
- **Product List** — View all products in a responsive card-based grid layout
- **Add Product** — Create new products with validated form inputs
- **Edit Product** — Update existing product details through a pre-filled modal form
- **Delete Product** — Remove products with a confirmation dialog
- **Search & Filter** — Debounced search across product names and categories
- **Loading States** — Animated spinner during API calls
- **Error States** — User-friendly error display with retry functionality
- **Empty States** — Helpful message when no products match the search
- **Responsive UI** — Mobile-first design that adapts to all screen sizes
- **Input Validation** — Both client-side and server-side validation

---

## 🛠️ Technology Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 19, Vite, JavaScript (ES6+)  |
| Styling    | Plain CSS with CSS Custom Properties|
| Backend    | Node.js, Express 5                  |
| API Client | Fetch API (native)                  |
| Data Store | In-memory JavaScript array          |
| Tooling    | Nodemon, Vite, dotenv               |
| IDs        | UUID v4                             |

---

## 📁 Project Structure

```
InventoryHub/
├── backend/
│   ├── src/
│   │   ├── server.js                 # Express entry point
│   │   ├── config/
│   │   │   ├── cors.js               # CORS configuration
│   │   │   └── env.js                # Environment variable loader
│   │   ├── controllers/
│   │   │   └── productController.js  # Request handlers
│   │   ├── middleware/
│   │   │   ├── errorHandler.js       # Global error + 404 handler
│   │   │   └── validateProduct.js    # Request body validation
│   │   ├── models/
│   │   │   └── productModel.js       # In-memory data store + seed data
│   │   ├── routes/
│   │   │   └── productRoutes.js      # Route definitions
│   │   └── utils/
│   │       └── responseHelper.js     # Standardized JSON response builders
│   ├── .env                          # PORT=5000
│   ├── .gitignore
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx                   # Root component with state management
│   │   ├── App.css
│   │   ├── main.jsx                  # React entry point
│   │   ├── index.css                 # Global styles + CSS variables
│   │   ├── components/
│   │   │   ├── Header.jsx / .css     # App header
│   │   │   ├── Dashboard.jsx / .css  # Stats summary cards
│   │   │   ├── SearchBar.jsx / .css  # Debounced search input
│   │   │   ├── ProductList.jsx / .css# Product grid with state handling
│   │   │   ├── ProductCard.jsx / .css# Individual product card
│   │   │   ├── ProductForm.jsx / .css# Add/Edit form with validation
│   │   │   ├── Modal.jsx / .css      # Reusable modal overlay
│   │   │   ├── ConfirmDialog.jsx/.css# Delete confirmation dialog
│   │   │   ├── LoadingSpinner.jsx/.css# Animated loading indicator
│   │   │   ├── ErrorMessage.jsx/.css # Error display with retry
│   │   │   └── EmptyState.jsx / .css # Empty results message
│   │   ├── hooks/
│   │   │   └── useProducts.js        # Custom hook for product state
│   │   ├── services/
│   │   │   └── api.js                # Centralized API service
│   │   └── utils/
│   │       └── formatters.js         # Price, date, text formatters
│   ├── .env                          # VITE_API_URL=http://localhost:5000/api
│   ├── .gitignore
│   ├── vite.config.js
│   └── package.json
├── .gitignore                        # Root gitignore
└── README.md                         # This file
```

---

## 🚀 Installation Instructions

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/InventoryHub.git
cd InventoryHub
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## ▶️ How to Run

### Start the Backend (Terminal 1)

```bash
cd backend
npm run dev
```

The backend API will start at **http://localhost:5000**.

### Start the Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

The frontend will start at **http://localhost:3000**.

> **Note:** Start the backend first. The frontend communicates with the backend at `http://localhost:5000/api`.

---

## 📡 API Endpoints

| Method   | Endpoint             | Description            | Status Codes |
|----------|----------------------|------------------------|-------------|
| `GET`    | `/api/products`      | List all products      | 200         |
| `GET`    | `/api/products/:id`  | Get product by ID      | 200, 404    |
| `POST`   | `/api/products`      | Create a new product   | 201, 400    |
| `PUT`    | `/api/products/:id`  | Update a product       | 200, 400, 404 |
| `DELETE` | `/api/products/:id`  | Delete a product       | 200, 404    |

### Query Parameters

- `GET /api/products?search=term` — Filter products by name or category (case-insensitive)

---

## 📦 JSON Response Examples

### Success — Product Collection

```json
{
  "success": true,
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Wireless Mouse",
      "description": "Ergonomic wireless mouse with fast scrolling.",
      "category": "Electronics",
      "quantity": 150,
      "price": 29.99,
      "sku": "EL-MS-001",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

### Success — Single Product (Create/Update)

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "name": "Wireless Mouse",
    "description": "Ergonomic wireless mouse with fast scrolling.",
    "category": "Electronics",
    "quantity": 150,
    "price": 29.99,
    "sku": "EL-MS-001",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  },
  "message": "Product created successfully"
}
```

### Error — Not Found

```json
{
  "success": false,
  "message": "Product not found"
}
```

### Error — Validation Failure

```json
{
  "success": false,
  "message": "Name is required and must be a string between 1 and 200 characters."
}
```

---

## 🔗 Frontend-Backend Integration

### Architecture

The frontend communicates with the backend through a **centralized API service** (`src/services/api.js`). This file contains a reusable `apiRequest()` base function that handles:

1. **URL construction** from the environment variable `VITE_API_URL`
2. **HTTP headers** (Content-Type: application/json)
3. **Error extraction** from the server's JSON error responses
4. **Response parsing** with proper error handling

### Data Flow

```
User Action → Component → useProducts Hook → API Service → Backend → Response
                                ↑                                      ↓
                          State Update ← Parsed JSON ← apiRequest() ←─┘
```

### Key Integration Patterns

- **Environment Variables**: API URL configured via `.env` (`VITE_API_URL`), not hardcoded
- **Custom Hook** (`useProducts`): Centralizes all product state and API calls
- **Consistent JSON Parsing**: The hook extracts `response.data` from the backend's `{ success, data }` wrapper
- **Error Propagation**: API errors are caught, parsed, and surfaced to the UI
- **Re-fetch After Mutations**: After create/update/delete, the product list is re-fetched to ensure consistency

---

## 🐛 Debugging — Issues Found and Resolved

### Issue 1: Response Data Structure Mismatch

**Problem:** The frontend `useProducts` hook was setting `products = data` directly from the API response, but the backend wraps data in `{ success: true, data: [...] }`. This caused `products.map()` to fail because `products` was the full response object, not an array.

**Solution:** Changed `setProducts(data)` to `setProducts(response.data || [])` in the `useProducts` hook to correctly extract the array from the JSON wrapper.

**File:** `frontend/src/hooks/useProducts.js`

### Issue 2: CORS Configuration

**Problem:** The frontend runs on port 3000 and the backend on port 5000, which are different origins. Without CORS configuration, the browser blocks cross-origin requests.

**Solution:** Configured the `cors` middleware in the backend (`src/config/cors.js`) to explicitly allow `http://localhost:3000` with the required HTTP methods (GET, POST, PUT, DELETE) and headers (Content-Type).

**File:** `backend/src/config/cors.js`

### Issue 3: Category Mismatch Between Frontend and Backend

**Problem:** The frontend's `ProductForm` had a category dropdown with `['Electronics', 'Clothing', 'Food', 'Books', 'Other']`, but the backend seed data uses `['Electronics', 'Furniture', 'Office Supplies']`. When editing existing products, their categories wouldn't appear in the dropdown.

**Solution:** Updated the category dropdown to include all categories: `['Electronics', 'Furniture', 'Office Supplies', 'Clothing', 'Food', 'Books', 'Other']`.

**File:** `frontend/src/components/ProductForm.jsx`

### Issue 4: Infinite Re-render Loop from Unstable Function Reference

**Problem:** `SearchBar` uses `onSearch` in a `useEffect` dependency array. In `App.jsx`, `handleSearch` was defined as a plain function, creating a new reference on every render. This triggered SearchBar's `useEffect` on every render, causing an infinite loop of API calls.

**Solution:** Wrapped `handleSearch` in `useCallback` with `[fetchProducts]` as the dependency, ensuring a stable function reference.

**File:** `frontend/src/App.jsx`

### Issue 5: Port Mismatch Prevention

**Problem:** If the backend runs on a port other than 5000, the frontend's hardcoded API URL would fail silently.

**Solution:** Both frontend and backend use `.env` files for port configuration. The frontend reads `VITE_API_URL` and the backend reads `PORT`, making the setup easily configurable.

**Files:** `frontend/.env`, `backend/.env`

---

## ⚡ Performance Optimizations

### 1. Debounced Search (300ms)

The `SearchBar` component uses `setTimeout`/`clearTimeout` with a 300ms delay before triggering API calls. This prevents firing a request on every keystroke.

**File:** `frontend/src/components/SearchBar.jsx`

### 2. Memoized Callback Functions

`fetchProducts` and `handleSearch` are wrapped in `useCallback` to prevent unnecessary re-creation on every render. This avoids triggering dependent `useEffect` hooks and prevents unnecessary child component re-renders.

**Files:** `frontend/src/hooks/useProducts.js`, `frontend/src/App.jsx`

### 3. Centralized API Service (DRY)

All API calls go through a single `apiRequest()` function that handles headers, error parsing, and response processing. This eliminates code duplication across 5 endpoint functions.

**File:** `frontend/src/services/api.js`

### 4. Efficient Server-Side Search

Search filtering happens on the backend using `Array.filter()` with short-circuit evaluation. The backend only returns matching products, reducing the response payload size.

**File:** `backend/src/controllers/productController.js`

### 5. Conditional Rendering to Avoid Unnecessary DOM Operations

`ProductList` renders mutually exclusive states (loading → error → empty → list) using early returns, avoiding rendering hidden components.

**File:** `frontend/src/components/ProductList.jsx`

### 6. Optimized State Updates

The `useProducts` hook clears `error` state before starting new operations and sets `loading` only when needed, preventing unnecessary renders from redundant state updates.

**File:** `frontend/src/hooks/useProducts.js`

### 7. No Unnecessary Dependencies

The project uses only essential packages:
- **Backend:** express, cors, dotenv, uuid (4 dependencies)
- **Frontend:** react, react-dom, @vitejs/plugin-react, vite (4 dependencies)

---

## 🤖 Microsoft Copilot Reflection

### Integration

Microsoft Copilot assisted in designing the **frontend-backend communication architecture**. Specifically:

- **API Service Pattern**: Copilot suggested the `apiRequest()` base function pattern in `api.js` — a single reusable function that constructs URLs, sets headers, handles errors, and parses JSON responses. This eliminated code duplication across all 5 CRUD endpoint functions.
- **Custom Hook Design**: Copilot helped structure the `useProducts` hook to centralize product state management, including proper `useCallback` usage for `fetchProducts` to create stable function references.
- **Environment Variable Setup**: Copilot recommended using `VITE_API_URL` for the frontend and `PORT` for the backend, keeping configuration out of source code.

### Debugging

Microsoft Copilot helped identify and resolve several integration errors:

- **JSON Response Mismatch**: Copilot identified that the frontend was consuming the raw API response (`{ success, data }`) without extracting the `data` field. It suggested changing `setProducts(data)` to `setProducts(response.data || [])`.
- **Infinite Re-render Loop**: Copilot diagnosed that passing an unstable `handleSearch` function to `SearchBar` caused its `useEffect` to re-fire continuously. It recommended wrapping the function in `useCallback`.
- **Category Dropdown Mismatch**: Copilot flagged that the form's category options didn't include categories present in the seed data (Furniture, Office Supplies), which would cause issues when editing existing products.

### JSON Structure

Microsoft Copilot helped create and refine the API JSON structure:

- **Consistent Response Wrapper**: Copilot suggested the `{ success: boolean, data: any, message?: string, count?: number }` structure, implemented through the `responseHelper.js` utility. This ensures every endpoint returns predictable JSON.
- **Error Response Consistency**: Copilot recommended the `{ success: false, message: string }` pattern for all error responses, making frontend error handling simpler — just check `response.ok` and extract `message`.
- **Validation Error Messages**: Copilot helped craft descriptive validation error messages that include the specific constraint that failed (e.g., "Name is required and must be a string between 1 and 200 characters").

### Optimization

Microsoft Copilot helped identify performance improvements:

- **Debounced Search**: Copilot recommended implementing debouncing in `SearchBar` using `setTimeout`/`clearTimeout` with a 300ms delay, instead of making an API call on every keystroke.
- **useCallback for Stable References**: Copilot identified that `fetchProducts` and `handleSearch` needed `useCallback` to prevent unnecessary re-renders and infinite loops.
- **Server-Side Filtering**: Copilot suggested moving search/filter logic to the backend rather than fetching all products and filtering on the client, reducing network payload.
- **Conditional Early Returns**: Copilot recommended the pattern of early returns in `ProductList` for loading/error/empty states, avoiding unnecessary DOM computations.

---

## 🔮 Future Improvements

1. **Persistent Database** — Replace the in-memory store with MongoDB or PostgreSQL
2. **Authentication** — Add user login/registration with JWT
3. **Pagination** — Implement server-side pagination for large datasets
4. **Image Upload** — Allow product image attachments
5. **Export/Import** — CSV export and bulk import functionality
6. **Unit Tests** — Add Jest tests for backend controllers and React component tests
7. **Dark Mode** — Add a theme toggle for dark/light mode
8. **Sorting** — Add column-based sorting (by price, quantity, name)
9. **Notifications** — Toast notifications for successful operations
10. **Docker** — Containerize the application for easy deployment

---

## 📄 License

This project is developed for educational purposes as part of a Coursera assignment.
